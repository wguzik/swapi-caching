import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class QueryService {
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
}
