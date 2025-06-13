// src/routes/meals/home.tsx
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Input } from '../../components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  customList,
  type CustomListResponse,
  lookupMealById,
  type MealsResponse,
  filterByCategory,
  filterByIngredient,
  filterByArea,
  type FilterResponseItem,
  type FilterResponse
} from '../../lib/api';
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meals | Meals Explorer" },
    { name: "description", content: "All Meals (catalog)" },
  ];
}

export function MealCard(meal: FilterResponseItem) {
  return (
    <Link to={`/meals/${meal.idMeal}`} className={`w-[400px] shadow-md block rounded-lg overflow-hidden relative group`} >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className=" object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">
        <h3 className="text-3xl font-bold text-center">{meal.strMeal}</h3>
      </div>
    </Link>
  )
}


export interface MealsCardProps {
  mealsValue: 'categories' | 'ingredients' | 'areas';
}

function MealsCard({ mealsValue }: MealsCardProps) {
  const [items, setItems] = useState<CustomListResponse>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [allData, setData] = useState<FilterResponse | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await customList(mealsValue);
      setItems(list);
      setLoading(false);
      setSelectedId(null);
      setData(null);
    })();
  }, [mealsValue]);

  useEffect(() => {
    (async () => {
      if (!selectedId) return;
      if (mealsValue === "categories"){
        const data = await filterByCategory(selectedId)
        setData(data)
        return
      }
      if (mealsValue === "ingredients"){
        const data = await filterByIngredient(selectedId)
        setData(data)
        return
      } 
      if (mealsValue === "areas"){
        const data = await filterByArea(selectedId)
        setData(data)
        return
      }  
    })();
    
  }, [selectedId]);

  const displayedItems = items.filter(item =>
    item.itemId.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="w-full flex flex-1 gap-4">
      <Card className="w-1/3 flex flex-col h-full">
        <CardHeader>
          <CardTitle className="font-semibold capitalize">
            {loading ? 'Loading...' : `All ${mealsValue}`}
          </CardTitle>
            <div className="text-sm text-gray-600">
            Total: {loading ? '—' : displayedItems.length}
          </div>
        </CardHeader>
        <div className="px-4">
          <Input
            placeholder={`Filter ${mealsValue}...`}
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="w-full"
          />
        </div>
        <CardContent className="flex-1 overflow-auto px-4">
          {loading ? (
            <p>Fetching {mealsValue}...</p>
          ) : (
            <ul className="px-2">
              {displayedItems.map(item => (
                <li key={item.itemId} className="cursor-pointer hover:text-blue-600 text-large"
                  onClick={() => setSelectedId(item.itemId)}>
                  {item.itemId}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
        <section className="w-2/3 h-full flex flex-wrap gap-4 items-center justify-center">
          {allData && allData.meals.map(item => (
            <MealCard {...item} />
          ))}

          {!allData && (
            <div className="flex pt-[20px] flex-col items-center justify-center p]">
              <img className="h-[20px]" src="dinner.svg" alt="dinner icon" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Select an item on the left!
              </h4>
            </div>
          )}
        </section>
    </div>
  );
}

export default function MealsHome() {
  return (
    <section className="h-full w-full flex justify-center p-4">
      <Tabs defaultValue="areas" className="w-full">
        <TabsList className="flex items-center justify-center w-1/3 mb-2">
          <TabsTrigger value="areas">Areas</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <MealsCard mealsValue="categories" />
        </TabsContent>

        <TabsContent value="ingredients">
          <MealsCard mealsValue="ingredients" />
        </TabsContent>

        <TabsContent value="areas">
          <MealsCard mealsValue="areas" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
