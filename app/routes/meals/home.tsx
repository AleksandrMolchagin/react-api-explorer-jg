import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meals | Meals Explorer" },
    { name: "description", content: "All Meals (catalog)" },
  ];
}

export default function MealsHome() {
  const meals = [
    { id: "1", name: "Meal 1" },
    { id: "2", name: "Meal 2" },
    { id: "3", name: "Meal 3" }
  ];

  return (
    <ul className="space-y-2">
      {meals.map((meal) => (
        <li key={meal.id}>
          <Link to={meal.id} className="text-blue-600 hover:underline">
            {meal.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
