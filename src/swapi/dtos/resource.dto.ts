import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { ResourceType } from "../types";

export class ResourceDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsEnum(ResourceType)
  @IsNotEmpty()
  resource: ResourceType;
}
