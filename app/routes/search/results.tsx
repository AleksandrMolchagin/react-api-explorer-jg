import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search | Meals Explorer" },
    { name: "description", content: "Search Results" },
  ];
}

export default function Results() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Search Results</h1>
      <p>Recipe search results appear here.</p>
    </div>
  );
}
