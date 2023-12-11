import { Injectable, NotFoundException } from "@nestjs/common";
import { CacheService } from "../cache/cache.service";
import { ResourceType } from "./types";
import dayjs from "dayjs";
import { QueryService } from "../query/query.service";

@Injectable()
export class SwapiService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly queryService: QueryService
  ) {}

  async getPageResource(resource: ResourceType, page = 1) {
    const isCached = await this.determineIfCacheIsUpToDate(resource, { page });
    if (isCached) return isCached.content;

    const slug = `${resource}/?page=${page}`;
    const content = await this.queryService.sendQuery(slug);
    if (!content) throw new NotFoundException("Resource not found");

    this.saveToCache("page", resource, { page, slug, content });

    return content;
  }

  async getItemResource(resource: ResourceType, id: number) {
    const isCached = await this.determineIfCacheIsUpToDate(resource, { id });
    if (isCached) return isCached.content;

    const slug = `${resource}/${id}`;
    const content = await this.queryService.sendQuery(slug);
    if (!content) throw new NotFoundException("Resource not found");

    this.saveToCache("single", resource, { id, slug, content });

    return content;
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

  private async determineIfCacheIsUpToDate(
    resource: ResourceType,
    identifier: { page?: number; id?: number }
  ) {
    const cached = await this.cacheService.retreiveFromCache(resource, {
      id: identifier.id,
      page: identifier.page,
    });
    if (cached === null) return false as const;

    const twentyFourHoursAgo = dayjs().subtract(24, "hours");
    const lastCachedAt = dayjs(cached.updatedAt);
    if (lastCachedAt.isAfter(twentyFourHoursAgo)) return cached;

    return false;
  }
}
