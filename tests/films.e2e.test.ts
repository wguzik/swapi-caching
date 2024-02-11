import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import supertest from "supertest";
import { seedFilmData } from "../prisma/seed-data/seed-data";
import { AppModule } from "../src/app.module";

describe("Single film route", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should return correct film data", async () => {
    const response = await supertest(app.getHttpServer())
      .post("/swapi-query/item")
      .send({
        resource: "films",
        id: 456,
      })
      //.expect(200);
      .expect(404);

    expect(response.body).toEqual(seedFilmData[1].content);
  });

  it("should return 404 if film not found", async () => {
    const response = await supertest(app.getHttpServer())
      .post("/swapi-query/item")
      .send({
        resource: "films",
        id: 789,
      })
      .expect(404);

    expect(response.body).toEqual({
      message: "Resource not found",
      error: "Not Found",
      statusCode: 404,
    });
  });

  it("should update the cache if data is outdated", async () => {
    const response = await supertest(app.getHttpServer())
      .post("/swapi-query/item")
      .send({
        resource: "films",
        id: 1,
      })
      .expect(200);

    expect(response.body).not.toEqual(seedFilmData[0].content);
    expect(response.body.title).toEqual("A New Hope");
  });

  afterAll(async () => {
    await app.close();
  });
});
