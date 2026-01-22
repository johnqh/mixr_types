/**
 * Tests for mixr_types exports
 */

import { describe, it, expect } from 'vitest';
import {
  EQUIPMENT_SUBCATEGORIES,
  INGREDIENT_SUBCATEGORIES,
  type IngredientSubcategory,
  type Equipment,
  type Ingredient,
  type Mood,
  type Recipe,
  type User,
  type RecipeRating,
  type RatingAggregate,
  type MixrApiResponse,
  type UpdateUserRequest,
  type SubmitRatingRequest,
  type GenerateRecipeRequest,
  type RatingListParams,
  type HealthResponse,
  type VersionResponse,
} from '../index';

describe('Constants', () => {
  describe('EQUIPMENT_SUBCATEGORIES', () => {
    it('should contain all equipment subcategories', () => {
      expect(EQUIPMENT_SUBCATEGORIES).toEqual([
        'essential',
        'glassware',
        'garnish',
        'advanced',
      ]);
    });

    it('should have 4 subcategories', () => {
      expect(EQUIPMENT_SUBCATEGORIES).toHaveLength(4);
    });

    it('should be an array', () => {
      expect(Array.isArray(EQUIPMENT_SUBCATEGORIES)).toBe(true);
    });
  });

  describe('INGREDIENT_SUBCATEGORIES', () => {
    it('should contain all ingredient subcategories', () => {
      expect(INGREDIENT_SUBCATEGORIES).toEqual([
        'spirit',
        'wine',
        'other_alcohol',
        'fruit',
        'spice',
        'other',
      ]);
    });

    it('should have 6 subcategories', () => {
      expect(INGREDIENT_SUBCATEGORIES).toHaveLength(6);
    });

    it('should be an array', () => {
      expect(Array.isArray(INGREDIENT_SUBCATEGORIES)).toBe(true);
    });
  });
});

describe('Type Validation', () => {
  describe('Equipment', () => {
    it('should accept valid equipment object', () => {
      const equipment: Equipment = {
        id: 1,
        subcategory: 'essential',
        name: 'Shaker',
        icon: 'shaker.png',
        createdAt: '2024-01-01T00:00:00Z',
      };

      expect(equipment.id).toBe(1);
      expect(equipment.subcategory).toBe('essential');
      expect(equipment.name).toBe('Shaker');
    });

    it('should accept null icon', () => {
      const equipment: Equipment = {
        id: 2,
        subcategory: 'glassware',
        name: 'Martini Glass',
        icon: null,
        createdAt: '2024-01-01T00:00:00Z',
      };

      expect(equipment.icon).toBeNull();
    });
  });

  describe('Ingredient', () => {
    it('should accept valid ingredient object', () => {
      const ingredient: Ingredient = {
        id: 1,
        subcategory: 'spirit',
        name: 'Vodka',
        icon: 'vodka.png',
        createdAt: '2024-01-01T00:00:00Z',
      };

      expect(ingredient.id).toBe(1);
      expect(ingredient.subcategory).toBe('spirit');
      expect(ingredient.name).toBe('Vodka');
    });

    it('should accept all valid subcategories', () => {
      const subcategories: IngredientSubcategory[] = [
        'spirit',
        'wine',
        'other_alcohol',
        'fruit',
        'spice',
        'other',
      ];

      subcategories.forEach((subcategory) => {
        const ingredient: Ingredient = {
          id: 1,
          subcategory,
          name: 'Test',
          icon: null,
          createdAt: '2024-01-01T00:00:00Z',
        };
        expect(ingredient.subcategory).toBe(subcategory);
      });
    });
  });

  describe('Mood', () => {
    it('should accept valid mood object', () => {
      const mood: Mood = {
        id: 1,
        emoji: '🎉',
        name: 'Celebratory',
        description: 'Perfect for celebrations',
        exampleDrinks: 'Champagne cocktails, Bellini',
        imageName: 'celebratory.png',
        createdAt: '2024-01-01T00:00:00Z',
      };

      expect(mood.id).toBe(1);
      expect(mood.emoji).toBe('🎉');
      expect(mood.name).toBe('Celebratory');
    });
  });

  describe('Recipe', () => {
    it('should accept valid recipe object', () => {
      const recipe: Recipe = {
        id: 1,
        name: 'Martini',
        description: 'A classic cocktail',
        moodId: 1,
        createdAt: '2024-01-01T00:00:00Z',
        mood: null,
        ingredients: [
          { id: 1, name: 'Gin', icon: null, amount: '2 oz' },
          { id: 2, name: 'Vermouth', icon: null, amount: '0.5 oz' },
        ],
        steps: ['Stir ingredients with ice', 'Strain into glass'],
        equipment: [{ id: 1, name: 'Mixing glass', icon: null }],
      };

      expect(recipe.name).toBe('Martini');
      expect(recipe.ingredients).toHaveLength(2);
      expect(recipe.steps).toHaveLength(2);
      expect(recipe.equipment).toHaveLength(1);
    });
  });

  describe('User', () => {
    it('should accept valid user object with snake_case fields', () => {
      const user: User = {
        id: 'user-123',
        email: 'test@example.com',
        display_name: 'Test User',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(user.id).toBe('user-123');
      expect(user.display_name).toBe('Test User');
    });
  });

  describe('RecipeRating', () => {
    it('should accept valid recipe rating object', () => {
      const rating: RecipeRating = {
        id: 1,
        recipe_id: 1,
        user_id: 'user-123',
        user_name: 'Test User',
        user_email: 'test@example.com',
        stars: 5,
        review: 'Excellent recipe!',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(rating.stars).toBe(5);
      expect(rating.review).toBe('Excellent recipe!');
    });

    it('should accept null review', () => {
      const rating: RecipeRating = {
        id: 1,
        recipe_id: 1,
        user_id: 'user-123',
        user_name: 'Test User',
        user_email: 'test@example.com',
        stars: 4,
        review: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(rating.review).toBeNull();
    });
  });

  describe('RatingAggregate', () => {
    it('should accept valid rating aggregate object', () => {
      const aggregate: RatingAggregate = {
        recipe_id: 1,
        average_rating: 4.5,
        total_ratings: 100,
        rating_distribution: {
          '1': 5,
          '2': 10,
          '3': 15,
          '4': 30,
          '5': 40,
        },
      };

      expect(aggregate.average_rating).toBe(4.5);
      expect(aggregate.total_ratings).toBe(100);
      expect(aggregate.rating_distribution['5']).toBe(40);
    });
  });
});

describe('Request Types', () => {
  describe('UpdateUserRequest', () => {
    it('should accept valid update user request', () => {
      const request: UpdateUserRequest = {
        display_name: 'New Name',
      };

      expect(request.display_name).toBe('New Name');
    });
  });

  describe('GenerateRecipeRequest', () => {
    it('should accept valid generate recipe request', () => {
      const request: GenerateRecipeRequest = {
        equipment_ids: [1, 2, 3],
        ingredient_ids: [4, 5, 6],
        mood_id: 1,
      };

      expect(request.equipment_ids).toHaveLength(3);
      expect(request.ingredient_ids).toHaveLength(3);
      expect(request.mood_id).toBe(1);
    });
  });

  describe('SubmitRatingRequest', () => {
    it('should accept rating with review', () => {
      const request: SubmitRatingRequest = {
        stars: 5,
        review: 'Great recipe!',
      };

      expect(request.stars).toBe(5);
      expect(request.review).toBe('Great recipe!');
    });

    it('should accept rating without review', () => {
      const request: SubmitRatingRequest = {
        stars: 4,
      };

      expect(request.stars).toBe(4);
      expect(request.review).toBeUndefined();
    });
  });
});

describe('Query Parameter Types', () => {
  describe('RatingListParams', () => {
    it('should accept all sort options', () => {
      const sortOptions: RatingListParams['sort'][] = [
        'newest',
        'oldest',
        'highest',
        'lowest',
      ];

      sortOptions.forEach((sort) => {
        const params: RatingListParams = { sort };
        expect(params.sort).toBe(sort);
      });
    });

    it('should accept pagination params', () => {
      const params: RatingListParams = {
        limit: 10,
        offset: 20,
        sort: 'newest',
      };

      expect(params.limit).toBe(10);
      expect(params.offset).toBe(20);
    });
  });
});

describe('API Response Types', () => {
  describe('MixrApiResponse', () => {
    it('should accept success response with data', () => {
      const response: MixrApiResponse<string[]> = {
        success: true,
        data: ['item1', 'item2'],
        count: 2,
      };

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(2);
    });

    it('should accept error response', () => {
      const response: MixrApiResponse = {
        success: false,
        error: 'Something went wrong',
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe('Something went wrong');
    });
  });

  describe('HealthResponse', () => {
    it('should accept valid health response', () => {
      const response: HealthResponse = {
        success: true,
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00Z',
      };

      expect(response.success).toBe(true);
      expect(response.status).toBe('healthy');
    });
  });

  describe('VersionResponse', () => {
    it('should accept valid version response', () => {
      const response: VersionResponse = {
        success: true,
        message: 'API is running',
        version: '1.0.0',
      };

      expect(response.version).toBe('1.0.0');
    });
  });
});
