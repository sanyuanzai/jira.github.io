import { QueryKey, useMutation, useQuery } from "react-query";
import { ListType } from "screens/project-list/list";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-optins";

export const useProject = (param?: Partial<ListType>) => {
  const client = useHttp();
  return useQuery<ListType[]>(["projects", param], () =>
    client("projects", { data: param })
  );
  //      const {run,...result} = useAsync<ListType[]>()
  //     const fetchProject = useCallback(()=>client("projects", { data: cleanObject(param) }),[client,param])
  //     useEffect(() => {
  //     run(fetchProject(),{retry:fetchProject});
  //   }, [param,run,fetchProject]);
  //   return result
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<ListType>) =>
      client(`projects/${param.id}`, { method: "PATCH", data: param }),
    useEditConfig(queryKey)
  );
  //  const {run,...asyncResult} = useAsync()
  //  const mutate = (param:Partial<ListType>) =>
  //  (run(client(`projects/${param.id}`,{data:param,method:'PATCH'})))
  //  return {mutate,...asyncResult}
};
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<ListType>) =>
      client(`projects`, { method: "POST", data: param }),
    useAddConfig(queryKey)
  );
};
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
export const useProjectDetail = (id?: number) => {
  const client = useHttp();
  return useQuery<ListType>(
    ["project", { id }],
    () => client(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
