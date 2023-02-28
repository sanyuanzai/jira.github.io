import React from "react";
import { Navigate } from "react-router-dom";
const EpicScreen = React.lazy(() => import("screens/epic"));
const KanbanScreen = React.lazy(() => import("screens/kanban"));
const routes = [
  {
    path: "",
    element: <Navigate to={"kanban"} />,
  },
  {
    path: "kanban",
    element: <KanbanScreen />,
  },
  {
    path: "epic",
    element: <EpicScreen />,
  },
];
export default routes;
