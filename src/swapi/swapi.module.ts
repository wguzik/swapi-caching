import { Module } from "@nestjs/common";
import { SwapiController } from "./swapi.controller";
import { SwapiService } from "./swapi.service";
import { CacheModule } from "src/cache/cache.module";

@Module({
  controllers: [SwapiController],
  providers: [SwapiService],
})
export class SwapiModule {}
