import React, { forwardRef } from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksType } from "utils/task-type";
import { useTaskModal, useTaskSearchParams } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import CreateTask from "./create-task";
import { Task } from "types/task";
import Mark from "./mark";
import { Row } from "components/lib";
import DeleteKanban from "./delete-kanban";
import { Drag, Drop, DropChild } from "components/drap-and-drop";

export const CloumnCard = React.forwardRef(({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  return (
    <Card
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
      onClick={() => startEdit(task.id)}
    >
      <Mark name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
})

export const KanbanColumn = React.forwardRef<HTMLDivElement,{ kanban: Kanban }>(({ kanban,...props } ,ref) =>{
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container ref={ref} {...props}>
      <Row bettween={true}>
        <h2>{kanban.name}</h2>
        <DeleteKanban kanbanId={kanban.id} key={kanban.id}/>
      </Row>
      <TaskContainer>
        <Drop type={'ROW'} direction={'vertical'} droppableId={"task"+kanban.id}>
          <DropChild>
            {tasks?.map((task,index) => (
            <Drag key={task.id} index={index} draggableId={'task'+task.id}>
              <div>
                <CloumnCard task={task} key={task.id}/>
              </div>
              </Drag>
        ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
})
const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTasksType();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img
      src={name === "task" ? taskIcon : bugIcon}
      alt={"类型图标"}
      style={{ width: "16px" }}
    />
  );
};
export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  margin-right: 1.5rem;
`;
const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
