import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsGuard } from "./guards";

@Controller("stats")
export class StatisticsController {
  constructor(private readonly statsService: StatisticsService) {}

  @UseGuards(StatisticsGuard)
  @Patch("update")
  async updateStatsCache() {
    return this.statsService.updateStatsCache();
  }

  @Get()
  async getStats() {
    return this.statsService.getStats();
  }
}
