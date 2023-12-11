import { Global, Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { PrismaModule } from "../prisma/prisma.module";

@Global()
@Module({
  providers: [CacheService],
  imports: [PrismaModule],
  exports: [CacheService],
})
export class CacheModule {}
