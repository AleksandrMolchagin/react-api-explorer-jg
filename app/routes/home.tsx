import type { Route } from "./+types/home";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meals Explorer" },
    { name: "description", content: "Compile Your Cravings" },
  ];
}
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">

      <div className="flex items-center space-x-2 ">
        <h3 className="text-2xl font-semibold">Compile Your Cravings</h3>
        <img className="h-10" src="/food-tray.svg" alt="tray icon" />
      </div>

      <div className="w-5/6 max-w-md flex flex-col gap-2">
        <Input placeholder="Find a recipe or ingredient..." />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" >Search</Button>
        <Button variant="outline" >I am lucky today!</Button>
      </div>
    </div>
  );
}
