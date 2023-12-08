import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ResourceType } from "../types";

export class PageDto {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  page?: number;

  @IsEnum(ResourceType)
  @IsNotEmpty()
  resource: ResourceType;
}
