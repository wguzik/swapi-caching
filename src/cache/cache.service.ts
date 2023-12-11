import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ResourceType } from "../swapi/types";
import type { CachePayload, CacheQuery } from "./types";
import { PrismaService } from "../prisma/prisma.service";
import dayjs from "dayjs";

@Injectable()
export class CacheService {
  constructor(private readonly prisma: PrismaService) {}

  async retreiveFromCache(type: ResourceType, payload: CacheQuery) {
    if (payload.id) {
      switch (type) {
        case "films":
          return await this.prisma.films.findUnique({
            where: { id: payload.id },
            select: { content: true, updatedAt: true },
          });

        case "planets":
          return await this.prisma.planets.findUnique({
            where: { id: payload.id },
            select: { content: true, updatedAt: true },
          });

        case "vehicles":
          return await this.prisma.vehicles.findUnique({
            where: { id: payload.id },
            select: { content: true, updatedAt: true },
          });

        case "starships":
          return await this.prisma.starships.findUnique({
            where: { id: payload.id },
            select: { content: true, updatedAt: true },
          });

        case "species":
          return await this.prisma.species.findUnique({
            where: { id: payload.id },
            select: { content: true, updatedAt: true },
          });
      }
    }

    if (payload.page) {
      switch (type) {
        case "films":
          return await this.prisma.filmsPages.findUnique({
            where: { page_id: payload.page },
            select: { content: true, updatedAt: true },
          });

        case "planets":
          return await this.prisma.planetsPages.findUnique({
            where: { page_id: payload.page },
            select: { content: true, updatedAt: true },
          });

        case "vehicles":
          return await this.prisma.vehiclesPages.findUnique({
            where: { page_id: payload.page },
            select: { content: true, updatedAt: true },
          });

        case "starships":
          return await this.prisma.starshipsPages.findUnique({
            where: { page_id: payload.page },
            select: { content: true, updatedAt: true },
          });

        case "species":
          return await this.prisma.speciesPages.findUnique({
            where: { page_id: payload.page },
            select: { content: true, updatedAt: true },
          });
      }
    }

    throw new InternalServerErrorException("No id or page provided");
  }

  async saveToCache(type: ResourceType, payload: CachePayload) {
    if (payload.id) {
      switch (type) {
        case "films":
          return await this.prisma.films.upsert({
            where: { id: payload.id },
            create: {
              id: payload.id,
              slug: payload.slug,
              title: payload.content.title,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "planets":
          return await this.prisma.planets.upsert({
            where: { id: payload.id },
            create: {
              id: payload.id,
              slug: payload.slug,
              name: payload.content.name,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "vehicles":
          return await this.prisma.vehicles.upsert({
            where: { id: payload.id },
            create: {
              id: payload.id,
              slug: payload.slug,
              name: payload.content.name,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "starships":
          return await this.prisma.starships.upsert({
            where: { id: payload.id },
            create: {
              id: payload.id,
              slug: payload.slug,
              name: payload.content.name,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "species":
          return await this.prisma.species.upsert({
            where: { id: payload.id },
            create: {
              id: payload.id,
              slug: payload.slug,
              name: payload.content.name,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });
      }
    }

    if (payload.page) {
      switch (type) {
        case "films":
          return await this.prisma.filmsPages.upsert({
            where: { page_id: payload.page },
            create: {
              page_id: payload.page,
              slug: payload.slug,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "planets":
          return await this.prisma.planetsPages.upsert({
            where: { page_id: payload.page },
            create: {
              page_id: payload.page,
              slug: payload.slug,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "vehicles":
          return await this.prisma.vehiclesPages.upsert({
            where: { page_id: payload.page },
            create: {
              page_id: payload.page,
              slug: payload.slug,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "starships":
          return await this.prisma.starshipsPages.upsert({
            where: { page_id: payload.page },
            create: {
              page_id: payload.page,
              slug: payload.slug,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });

        case "species":
          return await this.prisma.speciesPages.upsert({
            where: { page_id: payload.page },
            create: {
              page_id: payload.page,
              slug: payload.slug,
              content: payload.content,
            },
            update: { updatedAt: dayjs().toDate() },
          });
      }
    }

    throw new InternalServerErrorException("No id or page provided");
  }
}
