import type { Route } from "./+types/home";
import { MealCard } from "./meals/home";
import { type FilterResponse, lookupMealById, type MealsResponse } from "../lib/api";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saved | Meals Explorer" },
    { name: "description", content: "Your saved recipes." },
  ];
}

export default function Saved() {
  const [savedMeals, setSavedMeals] = useState<MealsResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedMeals = async () => {
      try {
        const raw = localStorage.getItem('favorites');
        const savedIds: string[] = raw ? JSON.parse(raw) : [];
        
        const meals = await Promise.all(
          savedIds.map(id => lookupMealById(id))
        );
        
        setSavedMeals(meals);
      } catch (error) {
        console.error('Failed to load saved meals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedMeals();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading your favorites...</p>
      ) : savedMeals.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {savedMeals.map((meal) => (
            meal.meals?.[0] && <MealCard key={meal.meals[0].idMeal} {...meal.meals[0]} />
          ))}
        </div>
      ) : (
        <div className="flex pt-[20px] flex-row items-center justify-center p gap-2">
        <img className="h-[20px]" src="dinner.svg" alt="dinner icon" />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          You haven't saved any meals yet.
        </h4>
      </div>
      )}
    </div>
  );
}
