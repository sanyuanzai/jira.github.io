import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "utils";
import { useProjectDetail } from "utils/project";
import { useTaskDetail } from "utils/task";
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
  const debouceName = useDebounce(param.name, 300);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debouceName || undefined,
    }),
    [param, projectId, debouceName]
  );
};
export const useTaskQueryKey = () => ["tasks", useKanbanSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTaskDetail(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return { editingTask, editingTaskId, startEdit, close, isLoading };
};
