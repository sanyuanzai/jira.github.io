import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drap-and-drop";
import { ScreenContainer } from "components/lib";
import React, { memo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import CreateKanban from "./create-kanban";
import {KanbanColumn} from "./kanban-column";
import SearchPanel from "./search-panel";
import TaskModal from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from "./util";

const KanbanScreen = memo(() => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"} >
              <ColumnsContainer>
              <DropChild>
                <div style={{display:'flex',height:'100% '}}>
                {kanbans?.map((kanban, index) => (
                <Drag
                  key={kanban.id}
                  draggableId={"kanban" + kanban.id}
                  index={index}
                >
                  <KanbanColumn kanban={kanban}></KanbanColumn>
                </Drag>
              ))}
                </div>
              
              </DropChild>
              <CreateKanban />
            </ColumnsContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
});
export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
export default KanbanScreen;
