import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthCheckModule } from "./modules/health-check/health-check.module";
import { PrismaModule } from "./modules/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
