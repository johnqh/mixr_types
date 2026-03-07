# @sudobility/mixr_types

TypeScript type definitions for the MIXR cocktail recipe platform.

## Installation

```bash
bun add @sudobility/mixr_types
```

## Usage

```typescript
import type {
  Equipment, Ingredient, Mood, Recipe, User,
  GenerateRecipeRequest, MixrApiResponse,
} from '@sudobility/mixr_types';

import { EQUIPMENT_SUBCATEGORIES, INGREDIENT_SUBCATEGORIES } from '@sudobility/mixr_types';
```

## Types

### Entity Types

- `Equipment` -- bar tools with subcategory, name, icon
- `Ingredient` -- cocktail ingredients with subcategory, name, icon
- `Mood` -- mood options (emoji, name, description, example drinks)
- `User` -- user profile (email, display name)
- `UserPreferences` -- saved equipment/ingredient IDs
- `Recipe` -- generated recipe with mood, ingredients, steps, equipment
- `RecipeRating` -- user rating (1-5 stars + review)
- `RatingAggregate` -- average rating, total count, distribution

### Request Types

- `GenerateRecipeRequest` -- equipment_ids, ingredient_ids, mood_id
- `UpdateUserRequest`, `UpdateUserPreferencesRequest`
- `SubmitRatingRequest`, `AddFavoriteRequest`

### Response Types

- `MixrApiResponse<T>` -- standard wrapper (success, data, error, count)
- Entity-specific responses: `EquipmentListResponse`, `RecipeResponse`, etc.

### Enums and Constants

- `EquipmentSubcategory`: `'essential' | 'glassware' | 'garnish' | 'advanced'`
- `IngredientSubcategory`: `'spirit' | 'wine' | 'other_alcohol' | 'fruit' | 'spice' | 'other'`
- `EQUIPMENT_SUBCATEGORIES`, `INGREDIENT_SUBCATEGORIES` -- array constants

## Development

```bash
bun run build        # Build ESM + CJS
bun run test         # Run Vitest
bun run typecheck    # TypeScript check
bun run lint         # Run ESLint
bun run verify       # Typecheck + lint + build
```

## Dual Build

Supports both ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) with type declarations (`dist/index.d.ts`).

## Related Packages

- `@sudobility/mixr_client` -- API client and React hooks
- `@sudobility/mixr_lib` -- business logic and utilities
- `mixr_api` -- backend API server
- `mixr` -- frontend web app

## License

MIT
