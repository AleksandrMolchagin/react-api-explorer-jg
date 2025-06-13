import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saved | Meals Explorer" },
    { name: "description", content: "Your saved recipes." },
  ];
}

export default function Saved() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Saved Meals</h1>
      <p>Your favorites will show up here.</p>
    </div>
  );
}
