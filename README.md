# Swapi-caching

all credits to https://github.com/matt-jb/

## Prereqs

- npm
- docker
- valid env file (for testing purposes, you may just rename the `.env.example` file to `.env`)

## Run project

App consists of Nest App that connects to PostgreSQL database (v14).

Run app:

```bash
$ docker-compose up -d
```

Validate endpoint health:

```bash
$ curl http://localhost:3000/health

> StatusCode        : 200
> StatusDescription : OK
> Content           : {"status":"OK"}
> RawContent        : HTTP/1.1 200 OK
```

Stop application:

```bash
$ docker-compose down
```

## Endpoints

**POST /swapi-query/page**

For retreiving full pages content.

The content will cache for 24 hours, so any request for the same data before that time will result in serving content cached in the PostgreSQL database.

Request body:

```
resource!: enum ("films" | "planets" | "species" | "starships" | "vehicles")
page?: number
```

Response example:

```
{
    "count": 60,
    "next": "https://swapi.dev/api/planets/?page=2",
    "previous": null,
    "results": [
        {
            "name": "Tatooine",
...
}
```

**POST /swapi-query/item**

For retreiving data about single entities (films, planets, etc.).

The content will cache for 24 hours, so any request for the same data before that time will result in serving content cached in the PostgreSQL database.

Request body:

```
resource!: enum ("films" | "planets" | "species" | "starships" | "vehicles")
id!: number
```

Response example:

```
{
    "name": "Alderaan",
    "rotation_period": "24",
    "orbital_period": "364",
    "diameter": "12500",
...
}
```

**GET /stats**

For retreiving statistics about:

1. Characters most frequently mentioned in the films' opening crawls.
2. Words counts in opening crawls.

The content will cache for 24 hours, so any request for the same data before that time will result in serving content cached in the PostgreSQL database.

Response example:

```
{
    "charactersStatistics": {
        "description": "Most frequent characters in opening crawls",
        "data": [
            "Luke Skywalker",
            "Dooku"
        ]
    },
    "wordsStatistics": {
        "description": "Words counts in opening crawls",
        "data": {
            "it": 3,
            "is": 7,
            "a": 9,
            "period": 1,
            "of": 21,
...
}
```

**PUT /stats/update**

Manually triggering a refresh of the data for the `GET /stats` route.

If data isn't cached (or the cache is not fresh), the `GET /stats` route sends multiple requests to the `/people` SWAPI endpoint (and a single `/films` endpoint request). Since SWAPI is quite slow to respond, this results in returning fresh data only after 10+ seconds. This sort of route should receive, e.g. daily, a CRON job request for refreshing the cache. This would make this long operation always having fresh data and making response times instantaneous.

**IMPORTANT**: No body is needed for this endpoint, but you need to provide a valid `X-Stats-Auth` header in order to be validated (default value in the `.env.example` file is: `foo-bar`).
