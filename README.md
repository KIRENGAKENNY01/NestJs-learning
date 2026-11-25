# My Podcast API

My Podcast API is a learning project built with NestJS and TypeScript. It demonstrates how to organize an HTTP API using modules, controllers, services, dependency injection, DTOs, pipes, guards, unit tests, and end-to-end tests.

The application provides an in-memory podcast episode API. Episodes can be created and retrieved, but the data is reset whenever the application restarts because no database or persistent storage is currently configured.

## What was implemented

- Created a NestJS application using the ESM/TypeScript project structure.
- Added a root application module and an `AppController` health-style greeting endpoint.
- Created an `EpisodesModule` with:
  - `EpisodesController` for HTTP routing.
  - `EpisodesService` for episode operations.
  - `CreateEpisodeDto` for request validation.
  - `Episode` as the episode entity shape.
- Implemented episode listing, featured-episode filtering, lookup by ID, and creation.
- Added UUID generation for new episode IDs.
- Added sorting by episode name in ascending or descending order.
- Added API key protection for all episode routes.
- Added custom validation and transformation for request data:
  - String, boolean, date, and optional field validation.
  - Positive-number validation for the `limit` query parameter.
  - Integer parsing for `limit`.
- Added unit test coverage for the controller and service setup.
- Added an end-to-end test for the root endpoint.
- Configured Vitest for unit and e2e test execution.
- Configured NestJS Observe instrumentation for telemetry, tracing, metrics, and error reporting.
- Added an initial modular configuration structure for `ConfigModule` and `ConfigService`.

## Technology stack

- Node.js
- NestJS 12
- TypeScript
- Express
- class-validator and class-transformer
- Vitest and Supertest
- @nestjs/observe
- oxlint and Prettier

## API routes

Every route under `/episodes` requires the `X-API-KEY` header.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Returns `Hello World!` |
| `GET` | `/episodes` | Returns all episodes; supports `sort=asc` or `sort=desc` |
| `GET` | `/episodes/featured` | Returns episodes marked as featured |
| `GET` | `/episodes/:id` | Returns one episode by ID, or `404` when not found |
| `POST` | `/episodes` | Creates a new episode |

### Example: create an episode

```bash
curl -X POST http://localhost:3000/episodes \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: my-secret-api-key" \
  -d "{\"name\":\"My First Episode\",\"featured\":true,\"publishedAt\":\"2026-11-25T12:00:00.000Z\"}"
```

### Example: list episodes

```bash
curl "http://localhost:3000/episodes?sort=asc&limit=100" \
  -H "X-API-KEY: my-secret-api-key"
```

The `sort` query parameter defaults to `desc`. The `limit` query parameter defaults to `100`; it must be a positive integer.

## API key

For this learning project, the episode API key is currently hard-coded:

```text
X-API-KEY: my-secret-api-key
```

Requests without the correct header are rejected by `ApiKeyGuardGuard`. This is suitable for practice only; a production application should load API keys or authentication credentials from environment variables and use a real authentication strategy.

## Project setup

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

## Running the project

Development mode:

```bash
npm run start
```

Watch mode:

```bash
npm run start:dev
```

Debug mode:

```bash
npm run start:debug
```

Production build and run:

```bash
npm run build
npm run start:prod
```

The server listens on `PORT`, or port `3000` when `PORT` is not set.

## Testing

Run unit tests:

```bash
npm test
```

Run unit tests in watch mode:

```bash
npm run test:watch
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run coverage:

```bash
npm run test:cov
```

## Code quality

Format source and test files:

```bash
npm run format
```

Run lint checks:

```bash
npm run lint
```

## NestJS Observe

The application includes NestJS Observe instrumentation. Telemetry is sent when `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` are configured:

```text
OBSERVE_APP_KEY=<your-app-key>
OBSERVE_APP_SECRET=<your-app-secret>
```

To link the application, run:

```bash
npx @nestjs/observe link
```

This opens the Observe linking flow and writes the credentials to `.env`.

## Project structure

```text
src/
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts
  config/
    config.module.ts
    config.service.ts
  episodes/
    episodes.controller.ts
    episodes.module.ts
    episodes.service.ts
    dto/
    entities/
    guards/
    pipes/
  topics/
    topics.module.ts
test/
  app.e2e-spec.ts
```

## Current limitations

- Episodes are stored only in a JavaScript array, so they do not survive application restarts.
- The API key is hard-coded.
- There is no database integration or repository layer.
- There is no update or delete endpoint.
- The `limit` value is validated but is not currently used to reduce the returned episode list.
- The `TopicsModule` is only a basic module scaffold.

## License

This project is private and is provided for learning purposes.
