# MIXR Types

TypeScript type definitions for MIXR API - Cocktail recipe platform.

**npm**: `@sudobility/mixr_types` (public)

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Bun
- **Package Manager**: Bun (do not use npm/yarn/pnpm for installing dependencies)
- **Build**: TypeScript compiler (dual ESM/CJS)
- **Test**: Vitest

## Project Structure

```
src/
├── index.ts          # All type definitions and constants
└── __tests__/
    └── index.test.ts # Type validation tests
dist/
├── index.js          # ESM build
├── index.cjs         # CommonJS build
└── index.d.ts        # Type declarations
```

## Commands

```bash
bun run build        # Build ESM + CJS
bun run build:esm    # Build ESM only
bun run build:cjs    # Build CJS only
bun run clean        # Remove dist/
bun run test         # Run Vitest
bun run typecheck    # TypeScript check
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run verify       # Typecheck + lint + build
```

## Type Categories

### Subcategory Enums & Constants
- `EquipmentSubcategory`: 'essential' | 'glassware' | 'garnish' | 'advanced'
- `IngredientSubcategory`: 'spirit' | 'wine' | 'other_alcohol' | 'fruit' | 'spice' | 'other'
- `EQUIPMENT_SUBCATEGORIES` / `INGREDIENT_SUBCATEGORIES` - Array constants

### Entity Types (Database Models)
- `Equipment` - id, subcategory, name, icon, createdAt
- `Ingredient` - id, subcategory, name, icon, createdAt
- `Mood` - id, emoji, name, description, exampleDrinks, imageName, createdAt
- `User` - id, email, display_name, created_at, updated_at
- `UserPreferences` - equipment_ids[], ingredient_ids[], updated_at
- `Recipe` - id, name, description, moodId, createdAt, mood, ingredients[], steps[], equipment[]
- `RecipeRating` - id, recipe_id, user_id, stars, review, timestamps
- `RatingAggregate` - recipe_id, average_rating, total_ratings, rating_distribution

### Request Types
- `GenerateRecipeRequest` - equipment_ids[], ingredient_ids[], mood_id
- `UpdateUserRequest` - display_name
- `UpdateUserPreferencesRequest` - equipment_ids[], ingredient_ids[]
- `SubmitRatingRequest` - stars, review?
- `AddFavoriteRequest` - recipe_id

### Response Types
- `MixrApiResponse<T>` - Standard wrapper with success, data, error, count
- Entity-specific: `EquipmentListResponse`, `RecipeResponse`, etc.

### Query Parameter Types
- `EquipmentQueryParams` - subcategory filter
- `IngredientQueryParams` - subcategory filter
- `PaginationParams` - limit, offset
- `RatingListParams` - sort options

## Usage

```typescript
import type {
  Equipment, Ingredient, Mood, Recipe, User,
  GenerateRecipeRequest, MixrApiResponse,
} from '@sudobility/mixr_types';

import { EQUIPMENT_SUBCATEGORIES, INGREDIENT_SUBCATEGORIES } from '@sudobility/mixr_types';
```

## Peer Dependencies

- `@sudobility/types` - Common Sudobility types

## Dual Build

Supports both ESM and CommonJS:

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

## Package Hierarchy

This is the base types package used by all other MIXR packages:

```
mixr_types (this package)
    ^
mixr_client (API hooks)
    ^
mixr_lib (business logic)
    ^
mixr (frontend)
mixr_api (backend)
```

## Publishing

```bash
bun run verify          # All checks
npm publish             # Publish to npm (public)
```
