# Improvement Plans for @sudobility/mixr_types

## Priority 1 - High Impact

### 1. Add Runtime Validation Schemas with Zod
- All types are compile-time only. Request types like `GenerateRecipeRequest`, `SubmitRatingRequest`, and `UpdateUserPreferencesRequest` have implicit constraints (e.g., `stars` must be 1-5, arrays must be non-empty) that are only enforced in the API routes.
- Adding Zod schemas alongside interfaces would enable validation at both client and server boundaries, reducing duplicated validation logic in `mixr_api` routes.
- The API already uses Zod for env validation (`src/config/env.ts`), so the dependency is already in the ecosystem.

### 2. Expand Test Coverage Beyond Type Shape Validation
- Only one test file exists (`src/__tests__/index.test.ts`) with basic type shape checks.
- Missing test scenarios: subcategory constant arrays match their type definitions, `MixrApiResponse` wrapper correctly types `data`, `error`, and `count` fields, response type aliases compose correctly.
- No tests validate that request type fields align with what the API actually expects (e.g., `stars` range in `SubmitRatingRequest`).

### 3. Eliminate Response Type Inconsistencies
- `AddFavoriteResponse` and `RemoveFavoriteResponse` define their own `{ success: boolean; message: string }` shape instead of using `MixrApiResponse<T>`, creating an inconsistency with all other response types.
- `HealthResponse` and `VersionResponse` also define custom shapes (`success + status + timestamp` and `success + message + version`) instead of using `MixrApiResponse<T>`.
- All response types should consistently use `MixrApiResponse<T>` to match the actual API response format and reduce type sprawl.

## Priority 2 - Medium Impact

### 4. Add JSDoc to Entity Types Describing Database Constraints
- Entity types like `Equipment`, `Ingredient`, `Mood`, `Recipe` have JSDoc on the interface but not on individual fields.
- Fields like `Equipment.icon` (nullable), `Mood.exampleDrinks` (format?), `RecipeRating.stars` (1-5 range), and `User.id` (Firebase UID) would benefit from per-field documentation.
- `RecipeIngredient.amount` is typed as `string` but could document expected format (e.g., "2 oz", "1/2 cup").

### 5. Add Pagination Metadata to List Response Types
- `RecipeListResponse` is `MixrApiResponse<Recipe[]>` which includes a `count` field, but there is no `offset` or `total` in the response type.
- The API returns paginated results with `limit` and `offset` params, but the response types do not capture total count for pagination UI calculations.
- A `PaginatedMixrApiResponse<T>` extending `MixrApiResponse<T[]>` with `total`, `offset`, `limit` fields would better represent paginated endpoints.

### 6. Tighten String Fields to Union Types Where Applicable
- `RatingListParams.sort` is already properly typed as `'newest' | 'oldest' | 'highest' | 'lowest'`, but similar patterns could be applied elsewhere.
- `Mood.emoji` is typed as `string` but represents emoji characters (could be narrowed or documented).
- `User.id` is `string` but always a Firebase UID (branded type candidate).

## Priority 3 - Nice to Have

### 7. Add Type Guard Utility Functions
- No type guard functions exist for narrowing `MixrApiResponse<T>` to success/error states.
- A `isSuccessResponse<T>(res: MixrApiResponse<T>)` type guard would improve downstream code that checks `if (response.success)` by narrowing the `data` field to `T` (not `T | undefined`).

### 8. Document Version Compatibility Between Packages
- The `package.json` exports are documented in CLAUDE.md but there is no version compatibility matrix showing which `mixr_types` versions work with which `mixr_client` or `mixr_api` versions.
- Adding a compatibility note or using strict peer dependency ranges would prevent version drift issues.
