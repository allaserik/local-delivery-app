**Plan**

# Muulo: Company Onboarding Foundation

## Summary

Build the first learning-oriented vertical slice: a temporary public flow for creating and viewing delivery companies. Use an npm-workspaces monorepo with Vue 3/Vite/Tailwind frontend, NestJS REST API, Prisma, and PostgreSQL through Docker Compose.

Remove the premature plain-Node prototype and start from the agreed stack.

## Implementation Changes

* Bootstrap npm workspaces with **apps/web** and **apps/api**; root scripts install, lint, test, build, and start each app consistently.
* Add Docker Compose PostgreSQL and a Prisma setup with migrations. The developer enables Docker Desktop’s WSL integration before running the database.
* Create the NestJS **CompaniesModule**:
  * **POST /api/companies** creates a company.
  * **GET /api/companies** lists companies.
  * **GET /api/companies/:id** returns a company and its weekly hours.
  * Use DTO validation and return clear validation errors.
* Model a company with name, contact email, phone, address, delivery-fee cents, delivery radius, currency, distance unit, and seven weekday operating-hour records.
  * Currency and distance unit are configurable per company.
  * Each day is either closed or has valid **openAt** / **closeAt** values; closing time must be after opening time.
  * Keep this public creation endpoint explicitly marked as learning-only; authentication and tenant authorization are the next slice.
* Build a responsive Vue onboarding screen with accessible fields, weekly-hours editor, client-side validation, loading/error/success states, and a confirmation/detail view after creation.
* Add a small companies list view so the created company can be retrieved through the frontend.
* Document setup, workspace commands, Docker prerequisites, API examples, and the learning outcomes: Nest modules, DTO validation, Prisma relations/migrations, Vue Composition API, and form handling.

## Test Plan

* Unit-test company validation and operating-hours rules, including closed days and invalid time ranges.
* Integration-test the three REST endpoints against PostgreSQL, including persisted hours and invalid request responses.
* Frontend-test form validation, submission states, API errors, and successful confirmation.
* Run API tests, frontend tests, type checks, linting, and production builds before considering the slice complete.

## Assumptions

* Initial deployment target is local development only.
* A company name and contact fields are not globally unique because user accounts do not exist yet.
* The first UI is an internal learning/demo onboarding flow, not a customer marketplace.
* The current **README.md**, **package.json**, **src/**, and **test/** prototype files will be removed as part of the bootstrap step; **LEARNING.md** and **AGENTS.md** remain the project guidance.
