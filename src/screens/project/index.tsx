import React, { memo } from "react";
import { Link, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import routes from "router/project";
import EpicScreen from "screens/epic";
import KanbanScreen from "screens/kanban";

const ProjectScreen = memo(() => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      {useRoutes(routes)}
    </div>
  );
});

export default ProjectScreen;
