# Sample guide

This repository demonstrates accessible UI/UX patterns alongside a small secure
ASP.NET Core API and a deployment pipeline. These are learning samples, not a
certified design system or a production-ready application. The UI applications
run independently of the API and do not send or persist form data.

## Folder map

| Folder | Contents and purpose |
| --- | --- |
| [`react/`](../react/) | React/TypeScript examples: native modal, action dropdown, validated form, and keyboard-navigable semantic table. |
| [`angular/`](../angular/) | Standalone Angular reactive form with associated labels/errors and a keyboard-accessible review dialog. |
| [`styles/`](../styles/) | Shared mobile-first Sass, responsive grid, Bootstrap-aligned cards/buttons/forms, visible focus, and forced-colors support. |
| [`shared/`](../shared/) | Framework-independent dialog focus helper used by React and Angular. |
| [`tests/`](../tests/) | Playwright keyboard, validation, layout, and axe checks; a report-producing scan covers seven application states. |
| [`Accessibility/`](../Accessibility/) | Generated axe results, remediation summary, and explicitly pending WAVE screenshots and JAWS/NVDA testing notes. |
| [`Backend/`](../Backend/) | .NET 10 ASP.NET Core API with GET/POST controllers, validation, DI, logging/error middleware, JWT authorization, and SQLite queries. |
| [`CI-CD/`](../CI-CD/) | Azure DevOps YAML for restore/build/test/publish and opt-in Azure App Service deployment, including Key Vault and environment configuration. |
| `Documentation/` | This overview, the [accessibility checklist](Accessibility-Checklist.md), and [design-system implementation guide](Design-System-Implementation.md). |

Generated `node_modules/`, `dist/`, `.angular/`, `bin/`, `obj/`, and
`test-results/` directories are build/dependency artifacts, not sample sources.

## What the samples demonstrate

**UI/UX:** consistent spacing, typography, button variants, and cards give both
frameworks a recognizable visual language. Mobile-first columns, wrapping
content, clear instructions, linked error summaries, and a review step help users
understand and recover from errors. These choices illustrate patterns; they have
not been validated through a user-research study.

**Accessibility:** semantic headings/landmarks/table headers, explicit form
labels, targeted ARIA, visible focus, documented keyboard interactions, and focus
restoration are implemented at component level. The checklist maps the relevant
WCAG 2.1 A/AA success criteria to source behavior and further verification.
Automated checks do not prove full conformance.

**.NET and secure coding:** the API separates controllers, service logic, and
parameterized data access. ASP.NET Core handles model validation, DI,
authentication, and authorization. JWT validation uses a trusted HTTPS
OAuth/OIDC issuer's discovery metadata, validates token properties, and gates
POST by the `CatalogEditor` role. The API does not implement an interactive login
flow or mint tokens. Logs avoid authorization headers and request bodies;
unhandled exceptions produce generic Problem Details responses.

**CI/CD:** the pipeline restores dependencies, builds all samples, runs the
existing UI tests, publishes evidence and an API package, then optionally deploys
on `main`. Deployment reads a named Key Vault secret and maps runtime settings
through environment variables. Azure resources, permissions, approvals, and
issuer configuration must be supplied; no deployment has been claimed. Backend
automated test coverage is not yet included.

## Tools and their actual use

| Tool | Use and current limits |
| --- | --- |
| React, TypeScript, Vite | React sample components and local development/production build. |
| Angular reactive forms | Declarative validation and the review-dialog workflow. |
| Sass/CSS Grid | Shared responsive component styling; no Bootstrap or Material package is installed. |
| Playwright | Chromium interaction tests, focus assertions, viewport checks, and JUnit output in CI. |
| axe-core (`@axe-core/playwright`) | Actual automated WCAG-tagged scans; see the timestamp and scope in [`axe-results.md`](../Accessibility/axe-results.md). Incomplete rules require manual review. |
| WAVE | Planned browser-extension scans. [`WAVE-screenshots/`](../Accessibility/WAVE-screenshots/) currently contains instructions, not scan screenshots. |
| JAWS / NVDA | Planned manual screen-reader checks. [`screen-reader-notes.md`](../Accessibility/screen-reader-notes.md) is a test template, not completed testing evidence. |
| .NET / ASP.NET Core | .NET 10 controller API, bearer authentication, middleware, and DI. ASP.NET Core is the current framework in the .NET Core lineage. |
| Microsoft.Data.Sqlite | Local sample persistence using SQL parameters rather than concatenated input. |
| Azure DevOps, App Service, Key Vault | Example build/deployment orchestration and secret retrieval; requires an authorized Azure setup. |

## Start here

The [root README](../README.md) contains UI setup commands.
The [backend guide](../Backend/README.md) covers identity-provider configuration
and API startup; the [pipeline guide](../CI-CD/README.md) covers Azure setup.
Use the checklist before changing a component and record new evidence in
`Accessibility/` without replacing pending manual checks with automated claims.
