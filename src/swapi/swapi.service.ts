import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CacheService } from "src/cache/cache.service";
import { ResourceType } from "./types";
import dayjs from "dayjs";

@Injectable()
export class SwapiService {
  constructor(private readonly cacheService: CacheService) {}

  async getPageResource(resource: ResourceType, page = 1) {
    const cached = await this.cacheService.retreiveFromCache(resource, {
      page,
    });

    const isCached = this.determineCacheStatus(cached);
    if (isCached) return cached.content;

    const slug = `${resource}/?page=${page}`;
    const content = await this.sendQuery(slug);
    if (!content) throw new NotFoundException("Resource not found");

    this.saveToCache("page", resource, { page, slug, content });

    return content;
  }

  async getItemResource(resource: ResourceType, id: number) {
    const cached = await this.cacheService.retreiveFromCache(resource, {
      id,
    });
    const isCached = this.determineCacheStatus(cached);
    if (isCached) return cached.content;

    const slug = `${resource}/${id}`;
    const content = await this.sendQuery(slug);
    if (!content) throw new NotFoundException("Resource not found");

    this.saveToCache("single", resource, { id, slug, content });

    return content;
  }

  async sendQuery(queryString: string): Promise<Record<PropertyKey, any>> {
    const URL = process.env.BASE_URL ?? "https://swapi.dev/api/";

    try {
      const result = await fetch(`${URL}${queryString}`);
      if (result.status === 404) return undefined;
      return result.json();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException("Unable to fetch data from SWAPI");
    }
  }

  private async saveToCache(
    amount: "single" | "page",
    type: ResourceType,
    payload: Record<PropertyKey, any>
  ) {
    return this.cacheService
      .saveToCache(type, {
        id: amount === "single" ? payload.id : undefined,
        page: amount === "page" ? payload.page : undefined,
        slug: payload.slug,
        content: payload.content,
      })
      .catch((e) => console.error(e));
  }

  private determineCacheStatus(
    cached: Awaited<
      ReturnType<typeof this.cacheService.retreiveFromCache>
    > | null
  ) {
    if (cached === null) return false;

    const twentyFourHoursAgo = dayjs().subtract(24, "hours");
    const lastCachedAt = dayjs(cached.updatedAt);

    return lastCachedAt.isAfter(twentyFourHoursAgo);
  }
}
