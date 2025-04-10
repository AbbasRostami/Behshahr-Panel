import { useRoutes } from "react-router-dom";

import { getRoutes } from "./routes";

import { useLayout } from "@hooks/useLayout";

const Router = () => {
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);

  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;
