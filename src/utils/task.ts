import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-optins";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
export const useTaskDetail = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["tasks", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Task>) => client(`tasks`, { method: "POST", data: param }),
    useAddConfig(queryKey)
  );
};
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Task>) =>
      client(`tasks/${param.id}`, { method: "PATCH", data: param }),
    useEditConfig(queryKey)
  );
};
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
