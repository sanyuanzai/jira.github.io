import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useProjectDetail } from "utils/project";
import { useUrlQueryParam } from "utils/url";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const projectId = useProjectIdInUrl();
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [param, projectId]
  );
};
export const useTaskQueryKey = () => ["tasks", useKanbanSearchParams()];
