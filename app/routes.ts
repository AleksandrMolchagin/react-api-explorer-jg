import {
  type RouteConfig,
  index,
  route,
  layout
} from "@react-router/dev/routes";

export default [
    layout("routes/home-layout.tsx", [
        index("routes/home.tsx"),
        route("saved", "routes/saved.tsx"),
        route("results", "routes/search/results.tsx"),
        route("meals", "routes/meals/home.tsx"),
        route("meals/:pid", "routes/meals/meal/meal.tsx")
    ]),
] satisfies RouteConfig;
