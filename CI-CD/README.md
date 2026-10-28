# Azure DevOps pipeline

`azure-pipelines.yml` restores dependencies, builds the .NET API and both UI
samples, runs .NET API tests and the Playwright/axe suite, publishes JUnit
results and accessibility evidence, packages the API, and optionally deploys
it to a Linux Azure App Service. The UI builds are validation only; this
pipeline deploys the API, not the static UI apps.

## Setup

1. Create an Azure DevOps YAML pipeline pointing at
   `CI-CD/azure-pipelines.yml`. CI and PR checks target `main`; adjust the branch
   filters and deployment condition together if your default branch differs.
2. Provision a Linux App Service with a .NET 10 runtime and HTTPS Only enabled.
   The pipeline does not create Azure infrastructure.
3. Create an Azure Resource Manager service connection using workload identity
   federation. Grant only the deployment permissions required on the app and
   secret Get/List permissions on the vault (for RBAC vaults, typically the
   Key Vault Secrets User role). Ensure the agent can reach the vault through its
   network rules.
4. Create `CatalogConnectionString` in Key Vault. For this single-instance SQLite
   sample use `Data Source=/home/catalog.db`. Do not use the package's read-only
   deployment directory for database storage. Persistent `/home` storage is
   enabled in the pipeline; do not scale this SQLite example out across workers.
   Use an appropriate managed database and repository implementation for a
   multi-instance production service.
5. Add Azure DevOps pipeline variables `oidcAuthority` and `oidcAudience`, using
   the real trusted HTTPS issuer and API audience from your identity provider.
   These are configuration identifiers, not credentials.
6. Pre-create the `api-production` Azure DevOps environment and configure
   approvals/checks and authorized pipelines. Restrict service-connection and
   environment access so untrusted PRs cannot obtain deployment secrets.
7. Run the pipeline manually with `deploy` enabled and supply the service
   connection, vault, resource group, and app names as parameters. Only a
   successful run on `main`, not a PR build, can enter deployment. Automatic
   builds leave deployment disabled.

## Environment variables and secrets

Build variables select the configuration/project and disable .NET telemetry.
`CI=true` makes Playwright start isolated servers; its JUnit output path is passed
through an environment variable. Node's development environment ensures build
and test dependencies are installed.

`AzureKeyVault@2` retrieves only `CatalogConnectionString` in the deployment job
as a secret pipeline variable. `AzureAppServiceSettings@1` passes it directly to
the app's `ConnectionStrings__Catalog` setting; it is not embedded in source,
build artifacts, command arguments, or explicit logging. The other app settings
demonstrate ASP.NET Core's double-underscore environment-variable mapping.
Keep secret values single-line and compatible with the JSON task input; this
sample's SQLite connection string needs no JSON escapes. Never enable task debug
logging or echo secret variables. Azure DevOps masking is not a substitute for
access control.

The secret is stored as an App Service application setting, accessible to
authorized app administrators. For production, prefer an App Service managed
identity with a Key Vault reference to avoid copying secrets through the
pipeline; configure and verify the corresponding vault access.

## Verification scope

The pipeline runs `dotnet test` against
`Backend/AccessibleApi.Tests/AccessibleApi.Tests.csproj`. These tests cover
request-model validation, controller response behavior, and SQLite repository
operations. They are not end-to-end tests of JWT authentication, HTTP hosting,
or Azure deployment; those behaviors require separate integration tests and a
configured identity provider.

Import and validate the pipeline in Azure DevOps after setting resource names,
variables, permissions, environment checks, and confirming .NET 10 runtime
availability in your App Service region. No Azure deployment is performed by
adding this sample to the repository.
