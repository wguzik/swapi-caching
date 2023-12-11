import { Module } from "@nestjs/common";
import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";
import { SwapiModule } from "../swapi/swapi.module";

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [SwapiModule],
})
export class StatisticsModule {}
