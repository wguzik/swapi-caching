import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SwapiService } from "./swapi.service";
import { PageDto, ResourceDto } from "./dtos";

@Controller("swapi-query")
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) {}

  @Post("page")
  @HttpCode(HttpStatus.OK)
  async getPageResource(@Body() body: PageDto) {
    return this.swapiService.getPageResource(body.resource, body.page);
  }

  @Post("item")
  @HttpCode(HttpStatus.OK)
  async getItemResource(@Body() body: ResourceDto) {
    return this.swapiService.getItemResource(body.resource, body.id);
  }
}
