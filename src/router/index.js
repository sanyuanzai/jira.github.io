import React from "react";
import { Navigate } from "react-router-dom";
const ProjectListScreen = React.lazy(() => import("screens/project-list"));
const ProjectScreen = React.lazy(() => import("screens/project"));
const routes = [
  {
    path: "/",
    element: <Navigate to={"projects"} />,
  },
  {
    path: "/projects",
    element: <ProjectListScreen />,
  },
  {
    path: "/projects/:projectId/*",
    element: <ProjectScreen />,
  },
];
export default routes;
