import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { PrismaService } from "src/prisma/prisma.service";
import {
  countOccurrences,
  countWordOccurrences,
  deleteDotsAndCommas,
  findMostFrequentOccurances,
} from "./helpers";
import { QueryService } from "src/query/query.service";
@Injectable()
export class StatisticsService {
  constructor(
    private readonly queryService: QueryService,
    private readonly prisma: PrismaService
  ) {}

  async getStats() {
    let isCached = await this.determineIfCacheIsUpToDate();
    if (!isCached) {
      isCached = await this.updateStatsCache();
    }

    const { films, characters } = isCached;

    const mostFrequentCharacters = this.getMostFrequentCharacters(
      films,
      characters
    );
    const mostFrequentWords = countWordOccurrences(
      deleteDotsAndCommas(films.join(" "))
    );

    return {
      charactersStatistics: {
        description: "Most frequent characters in opening crawls",
        data: mostFrequentCharacters,
      },
      wordsStatistics: {
        description: "Words counts in opening crawls",
        data: mostFrequentWords,
      },
    };
  }

  private getMostFrequentCharacters(films: string[], characters: string[]) {
    const cleanFilmsString = deleteDotsAndCommas(films.join(" "));
    const charactersCounts = countOccurrences(cleanFilmsString, characters);
    const mostFrequentCharacters = findMostFrequentOccurances(charactersCounts);
    return mostFrequentCharacters;
  }

  private async determineIfCacheIsUpToDate() {
    const films = await this.prisma.stats.findUnique({
      where: { type: "opening_crawls" },
      select: { updatedAt: true, content: true },
    });
    const characters = await this.prisma.stats.findUnique({
      where: { type: "people" },
      select: { updatedAt: true, content: true },
    });

    if (!films || !characters) return false as const;

    const isFilmsCacheUpToDate = dayjs(films.updatedAt).isAfter(
      dayjs().subtract(1, "day")
    );
    const isCharactersCacheUpToDate = dayjs(characters.updatedAt).isAfter(
      dayjs().subtract(1, "day")
    );

    if (isFilmsCacheUpToDate && isCharactersCacheUpToDate)
      return {
        films: films.content,
        characters: characters.content,
      };

    return false;
  }

  async updateStatsCache() {
    const filmsData = await this.getAllFilms();
    const charactersData = await this.getAllCharacters();

    const filmOpeningCrawls = filmsData.map((film) =>
      film.opening_crawl.replace(/\r\n/g, " ")
    );
    const characterNames = charactersData
      .map((page) => page.results.map((character) => character.name))
      .flat();

    const films = await this.prisma.stats.upsert({
      where: { type: "opening_crawls" },
      update: { content: filmOpeningCrawls, updatedAt: dayjs().toDate() },
      create: { type: "opening_crawls", content: filmOpeningCrawls },
      select: { content: true },
    });
    const characters = await this.prisma.stats.upsert({
      where: { type: "people" },
      update: { content: characterNames, updatedAt: dayjs().toDate() },
      create: { type: "people", content: characterNames },
      select: { content: true },
    });

    return { films: films.content, characters: characters.content };
  }

  private async getAllFilms() {
    const films = await this.queryService.sendQuery("films/");
    return films.results;
  }

  private async getAllCharacters() {
    const pages = parseInt(process.env.PEOPLE_PAGES) ?? 9;

    const results = await Promise.all(
      Array.from({ length: pages }, (_, i) =>
        this.queryService.sendQuery(`people/?page=${i + 1}`)
      )
    );

    return results;
  }
}
