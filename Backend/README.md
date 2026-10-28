# ASP.NET Core Web API sample

This .NET 10 API demonstrates controller-based endpoints, model validation,
dependency injection, structured logging, centralized error handling, OAuth 2.0 /
OpenID Connect issuer discovery, JWT access-token validation, role authorization,
and parameterized SQLite queries.

## Run

Install the .NET 10 SDK. Configure the API for a real trusted identity provider
before starting it:

```sh
cd Backend/AccessibleApi
dotnet user-secrets init
dotnet user-secrets set "Authentication:Authority" "https://YOUR-ISSUER/"
dotnet user-secrets set "Authentication:Audience" "YOUR-API-AUDIENCE"
dotnet run
```

Replace both example values with the issuer URL and API audience configured in
your identity provider. The API retrieves OpenID Connect signing metadata from
the configured HTTPS authority. No signing key is accepted from a request, and
the sample does not include credentials, client secrets, or a token-issuing
endpoint. Never use the placeholder authority in `appsettings.json` as a
production identity provider.

The local SQLite database `accessible-api.db` is created automatically beside
the app. Override its connection string with
`ConnectionStrings:Catalog` or the `ConnectionStrings__Catalog` environment
variable. Add a bearer access token to call protected endpoints:

```sh
curl -H "Authorization: Bearer $ACCESS_TOKEN" http://localhost:5000/api/catalog
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","description":"An accessible input device"}' \
  http://localhost:5000/api/catalog
```

The token must be issued for the configured audience and contain the
`CatalogEditor` role in its `roles` claim to create an item. Exact local ports
are printed by `dotnet run`. Do not put access tokens in source control or shell
history.

## Included examples

- `Controllers/CatalogController.cs`: authenticated `GET /api/catalog`,
  authenticated `GET /api/catalog/{id}`, and editor-authorized
  `POST /api/catalog`. `[ApiController]` automatically returns structured
  validation errors for invalid request models; successful POST returns 201 and
  a resource location.
- `Services/`: constructor-injected service boundary.
- `Middleware/RequestLoggingMiddleware.cs`: method, path, status, duration, and
  trace ID logging; it deliberately does not log authorization headers or body
  contents.
- `Middleware/ExceptionHandlingMiddleware.cs`: centralized logging and a
  generic Problem Details 500 response without exception details.
- `Program.cs`: bearer authentication with OIDC discovery, HTTPS metadata
  requirement, issuer/audience/signature/lifetime validation, short clock skew,
  role-based authorization, and authentication middleware before authorization.
- `Data/SqliteCatalogRepository.cs`: SQL values are bound through named
  parameters (`$id`, `$name`, `$description`, `$createdAt`), never interpolated
  into query text.

The endpoint is an API resource server: login and interactive OAuth/OIDC flows
belong in a trusted identity provider and client application. Use authorization
code flow with PKCE in browser/mobile clients; do not build a username/password
or implicit-flow token endpoint into this API. In production, also configure
HTTPS termination, secret management, key rotation, database migrations,
rate-limits, monitoring, and least-privilege roles for your deployment.

The pipeline registers request logging outside exception handling so the
request log records the final error status after the exception handler responds.

## Tests

Run the API tests from the repository root with:

```sh
dotnet test Backend/AccessibleApi.Tests/AccessibleApi.Tests.csproj
```

The test project covers request-model validation, controller response mapping,
and SQLite repository create/read behavior using an isolated temporary database.
It does not exercise a live HTTP server, JWT issuer, or Azure deployment.
