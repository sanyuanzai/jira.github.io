import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-optins";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Task[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Kanban>) =>
      client(`kanbans`, { method: "POST", data: param }),
    useAddConfig(queryKey)
  );
};
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", { data: params, method: "POST" });
  }, useReorderKanbanConfig(queryKey));
};
