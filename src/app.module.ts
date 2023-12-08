import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthCheckModule } from "./health-check/health-check.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SwapiModule } from "./swapi/swapi.module";
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthCheckModule,
    SwapiModule,
    CacheModule,
  ],
})
export class AppModule {}
