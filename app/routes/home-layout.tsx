import React from "react";
import { Outlet, Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../components/ui/navigation-menu"

export default function MealsLayout() {
  return (
    <div className="bg-gray-50">
      <section className="flex flex-row pt-2 px-4">
       <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mr-auto">
        Meals Explorer
      </h3>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link to="/">Search</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/meals">All Meals</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/saved">Saved</Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      </section>
      <Outlet />
    </div>
  );
}
