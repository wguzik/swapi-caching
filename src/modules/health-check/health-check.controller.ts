import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthCheckController {
  @Get()
  getHealthCheck() {
    return { status: "OK" };
  }
}
