import styled from "@emotion/styled";
import React, { memo } from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanColumn from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

const KanbanScreen = memo(() => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
        ))}
      </ColumnsContainer>
    </div>
  );
});
const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
export default KanbanScreen;
