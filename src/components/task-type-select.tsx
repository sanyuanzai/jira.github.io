import { useTasksType } from "utils/task-type";
import IdSelect from "./id-selcet";
import React from "react";

const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTasksType();
  return <IdSelect options={taskTypes || []} {...props} />;
};

export default TaskTypeSelect;
