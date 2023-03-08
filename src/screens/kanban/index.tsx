import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drap-and-drop";
import { ScreenContainer } from "components/lib";
import React, { memo, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import CreateKanban from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import SearchPanel from "./search-panel";
import TaskModal from "./task-modal";
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskQueryKey,
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
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColumnsContainer>
              <DropChild>
                <div style={{ display: "flex", height: "100% " }}>
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

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());
  const { data: allTasks = [] } = useTasks(useTaskSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};
export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
export default KanbanScreen;
