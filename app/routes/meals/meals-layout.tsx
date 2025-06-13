import React from "react";
import { Outlet, Link } from "react-router";

export default function MealsLayout() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Meals Section</h2>
      <Link to="/meals" className="underline mb-6 block">
        ← Back to all meals
      </Link>
      <Outlet />
    </div>
  );
}
