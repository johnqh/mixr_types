/**
 * @sudobility/mixr_types
 * TypeScript types for MIXR API - Cocktail recipe platform
 */

// Re-export common types from @sudobility/types
export type {
  ApiResponse,
  BaseResponse,
  NetworkClient,
  Optional,
  PaginatedResponse,
  PaginationInfo,
  PaginationOptions,
} from '@sudobility/types';

import type { Optional } from '@sudobility/types';

// =============================================================================
// Enum Types
// =============================================================================

/**
 * Equipment subcategory types
 */
export type EquipmentSubcategory =
  | 'essential'
  | 'glassware'
  | 'garnish'
  | 'advanced';

/**
 * Ingredient subcategory types
 */
export type IngredientSubcategory =
  | 'spirit'
  | 'wine'
  | 'other_alcohol'
  | 'fruit'
  | 'spice'
  | 'other';

/**
 * List of equipment subcategories
 */
export const EQUIPMENT_SUBCATEGORIES: EquipmentSubcategory[] = [
  'essential',
  'glassware',
  'garnish',
  'advanced',
];

/**
 * List of ingredient subcategories
 */
export const INGREDIENT_SUBCATEGORIES: IngredientSubcategory[] = [
  'spirit',
  'wine',
  'other_alcohol',
  'fruit',
  'spice',
  'other',
];

// =============================================================================
// API Response wrapper (matches existing MixrApiResponse)
// =============================================================================

/**
 * API Response wrapper
 */
export interface MixrApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

// =============================================================================
// Entity Types (database models)
// =============================================================================

/**
 * Equipment item (e.g., shaker, jigger, glass)
 */
export interface Equipment {
  id: number;
  subcategory: EquipmentSubcategory;
  name: string;
  icon: Optional<string>;
  createdAt: string;
}

/**
 * Ingredient (e.g., vodka, lime juice, sugar)
 */
export interface Ingredient {
  id: number;
  subcategory: IngredientSubcategory;
  name: string;
  icon: Optional<string>;
  createdAt: string;
}

/**
 * Mood for cocktail selection (e.g., celebratory, relaxed)
 */
export interface Mood {
  id: number;
  emoji: string;
  name: string;
  description: string;
  exampleDrinks: string;
  imageName: Optional<string>;
  createdAt: string;
}

/**
 * User profile (snake_case for API compatibility)
 */
export interface User {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

/**
 * User preferences for equipment and ingredients (snake_case for API compatibility)
 */
export interface UserPreferences {
  equipment_ids: number[];
  ingredient_ids: number[];
  updated_at: string;
}

/**
 * Recipe ingredient with amount
 */
export interface RecipeIngredient {
  id: number;
  name: string;
  icon: Optional<string>;
  amount: string;
}

/**
 * Recipe equipment item
 */
export interface RecipeEquipment {
  id: number;
  name: string;
  icon: Optional<string>;
}

/**
 * Complete recipe with all relations
 */
export interface Recipe {
  id: number;
  name: string;
  description: Optional<string>;
  moodId: Optional<number>;
  createdAt: string;
  mood: Optional<Mood>;
  ingredients: RecipeIngredient[];
  steps: string[];
  equipment: RecipeEquipment[];
}

/**
 * Recipe with userId field
 */
export interface RecipeWithUser extends Recipe {
  userId: Optional<string>;
}

/**
 * Recipe rating/review by a user (snake_case for API compatibility)
 */
export interface RecipeRating {
  id: number;
  recipe_id: number;
  user_id: string;
  user_name: string;
  user_email: string;
  stars: number;
  review: Optional<string>;
  created_at: string;
  updated_at: string;
}

/**
 * Rating aggregate statistics
 */
export interface RatingAggregate {
  recipe_id: number;
  average_rating: number;
  total_ratings: number;
  rating_distribution: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
}

// =============================================================================
// Request Body Types
// =============================================================================

/**
 * Request to update user profile
 */
export interface UpdateUserRequest {
  display_name: string;
}

/**
 * Request to update user preferences
 */
export interface UpdateUserPreferencesRequest {
  equipment_ids: number[];
  ingredient_ids: number[];
}

/**
 * Request to add a recipe to favorites
 */
export interface AddFavoriteRequest {
  recipe_id: number;
}

/**
 * Request to submit a recipe rating
 */
export interface SubmitRatingRequest {
  stars: number;
  review?: string;
}

/**
 * Request to generate a recipe
 */
export interface GenerateRecipeRequest {
  equipment_ids: number[];
  ingredient_ids: number[];
  mood_id: number;
}

// =============================================================================
// Query Parameter Types
// =============================================================================

/**
 * Query params for equipment list
 */
export interface EquipmentQueryParams {
  subcategory?: EquipmentSubcategory;
}

/**
 * Query params for ingredient list
 */
export interface IngredientQueryParams {
  subcategory?: IngredientSubcategory;
}

/**
 * Pagination query params
 */
export interface PaginationQueryParams {
  limit?: number;
  offset?: number;
}

/**
 * Rating list query params
 */
export interface RatingListParams {
  limit?: number;
  offset?: number;
  sort?: 'newest' | 'oldest' | 'highest' | 'lowest';
}

// =============================================================================
// API Response Type Aliases
// =============================================================================

// Equipment responses
export type EquipmentListResponse = MixrApiResponse<Equipment[]>;
export type EquipmentResponse = MixrApiResponse<Equipment>;
export type EquipmentSubcategoriesResponse = MixrApiResponse<string[]>;

// Ingredient responses
export type IngredientListResponse = MixrApiResponse<Ingredient[]>;
export type IngredientResponse = MixrApiResponse<Ingredient>;
export type IngredientSubcategoriesResponse = MixrApiResponse<string[]>;

// Mood responses
export type MoodListResponse = MixrApiResponse<Mood[]>;
export type MoodResponse = MixrApiResponse<Mood>;

// Recipe responses
export type RecipeListResponse = MixrApiResponse<Recipe[]>;
export type RecipeResponse = MixrApiResponse<Recipe>;

// User responses
export type UserResponse = MixrApiResponse<User>;
export type UserPreferencesResponse = MixrApiResponse<UserPreferences>;

// Favorites responses
export interface AddFavoriteResponse {
  success: boolean;
  message: string;
}

export interface RemoveFavoriteResponse {
  success: boolean;
  message: string;
}

// Rating responses
export type RecipeRatingResponse = MixrApiResponse<RecipeRating>;
export type RecipeRatingListResponse = MixrApiResponse<RecipeRating[]>;
export type RatingAggregateResponse = MixrApiResponse<RatingAggregate>;
export type DeleteRatingResponse = MixrApiResponse<{ message: string }>;

// =============================================================================
// Health check types
// =============================================================================

export interface HealthResponse {
  success: boolean;
  status: string;
  timestamp: string;
}

export interface VersionResponse {
  success: boolean;
  message: string;
  version: string;
}
