import styled from "@emotion/styled";
import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskSearchParams } from "./util";

export default function KanbanColumn({ kanban }: { kanban: Kanban }) {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
      <h2>{kanban.name}</h2>
      <div>
        {tasks?.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
    </div>
  );
}
