import { useMutation, useQuery, useQueryClient } from "react-query";
import { ListType } from "screens/project-list/list";
import { useHttp } from "./http";

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

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<ListType>) =>
      client(`projects/${param.id}`, { method: "PATCH", data: param }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  //  const {run,...asyncResult} = useAsync()
  //  const mutate = (param:Partial<ListType>) =>
  //  (run(client(`projects/${param.id}`,{data:param,method:'PATCH'})))
  //  return {mutate,...asyncResult}
};
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<ListType>) =>
      client(`projects`, { method: "POST", data: param }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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
