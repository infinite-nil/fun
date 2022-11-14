import {
  Outlet,
  RouterProvider,
  createReactRouter,
  createRouteConfig,
} from "@tanstack/react-router";

import "./App.css";
import Collision from "./routes/collision";
import Home from "./routes/home";

const routeConfig = createRouteConfig().createChildren((createRoute) => [
  createRoute({
    path: "/",
    element: <Home />,
  }),
  createRoute({
    path: "collision",
    element: <Collision />,
  }),
]);

const router = createReactRouter({
  routeConfig,
});

function App() {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
