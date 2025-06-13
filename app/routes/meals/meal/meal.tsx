import { useParams } from "react-router";
import {
  type MealsResponse,
  lookupMealById,
  type Meal,
} from '../../../lib/api';
import { Button } from "../../../components/ui/button"

import { useEffect, useState } from "react";

export function TypographyTable(props: Meal) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
          <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              Ingredient
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              Measure
            </th>
          </tr>
        </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(n => {
              const ingredient = (props as any)[`strIngredient${n}`];
              const measure    = (props as any)[`strMeasure${n}`];
              if (!ingredient) return null;
              return (
                <tr key={n} className="even:bg-muted border-t">
                  <td className="border px-4 py-2 text-left">{ingredient}</td>
                  <td className="border px-4 py-2 text-left">{measure}</td>
                </tr>
              );
            })}
          </tbody>

      </table>
    </div>
  )
}

export function appendIdToStorage(key: string, id: string): void {
  try {
    const raw = localStorage.getItem(key);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    arr.push(id);
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    console.error(`Failed to append ID to ${key}:`, e);
    localStorage.setItem(key, JSON.stringify([id]));
  }
}

export function removeIdFromStorage(key: string, id: string): void {
  try {
    const raw = localStorage.getItem(key);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    const newArr = arr.filter(item => item !== id);
    localStorage.setItem(key, JSON.stringify(newArr));
  } catch (e) {
    console.error(`Failed to remove ID from ${key}:`, e);
  }
}

export function isIdInStorage(key: string, id: string): boolean {
  try {
    const raw = localStorage.getItem(key);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    return arr.includes(id);
  } catch (e) {
    console.error(`Failed to check ID in ${key}:`, e);
    return false;
  }
}

export default function Meal() {
  const { pid } = useParams<{ pid: string }>();
  const [mealData, setData] = useState<MealsResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
    
  function setStoredIds(key: string, ids: string[]) {
    localStorage.setItem(key, JSON.stringify(ids));
  }

  useEffect(() => {
    (async () => {
      if (!pid) return;
      const data = await lookupMealById(pid)
      setData(data)
      if (data?.meals?.[0]?.idMeal) {
        setIsFavorite(isIdInStorage('favorites', data.meals[0].idMeal));
      }
    })();
  }, [pid]);

  const toggleFavorite = () => {
    if (!mealData?.meals?.[0]?.idMeal) return;
    
    if (isFavorite) {
      removeIdFromStorage('favorites', mealData.meals[0].idMeal);
    } else {
      appendIdToStorage('favorites', mealData.meals[0].idMeal);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="p-8">
      {mealData && mealData.meals && mealData.meals[0] && (
        <section>
          <div className="flex flex-row gap-8">
            <img
              src={mealData.meals[0].strMealThumb}
              alt={mealData.meals[0].strMeal}
              className="w-[400px] h-fit rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold">{mealData.meals[0].strMeal}</h3>

              <div className="flex flex-row gap-2">
                <h4 className="italic scroll-m-20 text-md tracking-tight">
                  {mealData.meals[0].strCategory}
                </h4>
                •
                <h4 className="italic scroll-m-20 text-md tracking-tight">
                  {mealData.meals[0].strArea}
                </h4>
              </div>
              <Button 
                onClick={toggleFavorite}
                className="mt-4"
                variant={isFavorite ? "destructive" : "default"}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              <p className="indent-8 leading-7 [&:not(:first-child)]:mt-6">
                  {mealData.meals[0].strInstructions}
                </p>
            </div>
          </div>
            <TypographyTable {...mealData.meals[0]}/>
        </section>
      )}
      {!mealData && 
        <h3 className="text-2xl font-semibold">Loading...</h3>
      }
    </div>
  );
}
