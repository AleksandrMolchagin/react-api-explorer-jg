import type { Route } from "./+types/home";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button"
import { useState, useEffect } from "react";
import { searchMealByName, type MealsResponse } from "../lib/api";
import { MealCard } from "./meals/home";
import {randomMeal} from "../lib/api"
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meals Explorer" },
    { name: "description", content: "Compile Your Cravings" },
  ];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MealsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          const results = await searchMealByName(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults(null);
      }
    }, 500); // Debounce search for 500ms

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const lucky = async () => {
    try {
      const randomMealData = await randomMeal();
      if (randomMealData.meals?.[0]?.idMeal) {
        navigate(`/meals/${randomMealData.meals[0].idMeal}`);
      }
    } catch (error) {
      console.error('Failed to get random meal:', error);
    } 
  };

  return (
    <div className="flex flex-col items-center gap-4 h-screen overflow-hidden">
      <div className="flex items-center space-x-2 mt-4">
        <h3 className="text-2xl font-semibold">Compile Your Cravings</h3>
        <img className="h-10" src="/food-tray.svg" alt="tray icon" />
      </div>

      <div className="w-5/6 max-w-md flex flex-col gap-2">
        <Input 
          placeholder="Find a recipe or ingredient..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2 cursor-pointer">
        <Button variant="outline" onClick={() => lucky()}>I am lucky today!</Button>
      </div>
  

      {loading && <p>Searching...</p>}
      
      {searchResults && (
        <div className="w-full p-6 overflow-y-auto flex-1">
          <div className="flex flex-wrap justify-center gap-4">
            {searchResults.meals?.map((meal) => (
              <MealCard key={meal.idMeal} {...meal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
