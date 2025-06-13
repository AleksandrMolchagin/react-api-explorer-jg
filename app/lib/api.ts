
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Meal {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
    strSource: string;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface MealCategoriesResponse {
    categories: {
        idCategory: string;
        strCategory: string;
        strCategoryThumb: string;
        strCategoryDescription: string;
    }[]
}

export interface ListCategoriesResponse {
    meals: {
        strCategory: string;
    }[]
}

export interface ListCategoriesResponse {
    meals: {
        strCategory: string;
    }[]
}

export interface ListIngridientsResponse {
    meals: {
        idIngredient: string;
        strIngredient: string;
        strDescription: string;
        strType: string | null;
    }[]
}

export interface ListAreasResponse {
    meals: {
        strArea: string;
    }[]
}

export interface FilterResponse {
    meals: {
        strMeal: string;
        strMealThumb: string;
        idMeal: string;
    }[]
}

export const searchMealByName = async (name: string): Promise<MealsResponse> => {
    const response = await axios.get<MealsResponse>(`${BASE_URL}/search.php`, {
        params: { s: name },
    });
    return response.data;
};

export const listMealsByFirstLetter = async (letter: string): Promise<MealsResponse> => {
    const response = await axios.get<MealsResponse>(`${BASE_URL}/search.php`, {
        params: { f: letter },
    });
    return response.data;
};


export const lookupMealById = async (id: string): Promise<MealsResponse> => {
    const response = await axios.get<MealsResponse>(`${BASE_URL}/lookup.php`, {
        params: { i: id },
    });
    return response.data;
};

export const randomMeal = async (): Promise<MealsResponse> => {
    const response = await axios.get<MealsResponse>(`${BASE_URL}/random.php`);
    return response.data;
};


export const listAllMealCategories = async (): Promise<MealCategoriesResponse> => {
    const response = await axios.get<MealCategoriesResponse>( `${BASE_URL}/categories.php`);
    return response.data;
};


export const listCategories = async (): Promise<ListCategoriesResponse> => {
    const response = await axios.get<ListCategoriesResponse>(`${BASE_URL}/list.php`, {
        params: { c: 'list' },});
    return response.data;
};


export const listIngredients = async (): Promise<ListIngridientsResponse> => {
    const response = await axios.get<ListIngridientsResponse>(`${BASE_URL}/list.php`, { 
        params: { i: 'list' },
    });
    return response.data;
};


export const listAreas = async (): Promise<ListAreasResponse> => {
    const response = await axios.get<ListAreasResponse>(`${BASE_URL}/list.php`, {
        params: { a: 'list' },
    });
    return response.data;
};


export const filterByIngredient = async (ingredient: string): Promise<FilterResponse> => {
    const response = await axios.get<FilterResponse>(`${BASE_URL}/filter.php`, {
        params: { i: ingredient },
    });
    return response.data;
};


export const filterByCategory = async (category: string): Promise<FilterResponse> => {
    const response = await axios.get<FilterResponse>(`${BASE_URL}/filter.php`, {
        params: { c: category },
    });
    return response.data;
};


export const filterByArea = async (area: string): Promise<FilterResponse> => {
    const response = await axios.get<FilterResponse>(`${BASE_URL}/filter.php`, {
        params: { a: area },
    });
    return response.data;
};