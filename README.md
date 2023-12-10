# Swapi-caching

## Prereqs

- npm
- docker

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
