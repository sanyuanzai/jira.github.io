import { useCallback, useEffect } from "react";
import { ListType } from "screens/project-list/list";
import cleanObject from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

 

 export const useProject = (param?:Partial<ListType>) =>{
    const {run,...result} = useAsync<ListType[]>()
    const client = useHttp()
    const fetchProject = useCallback(()=>client("projects", { data: cleanObject(param) }),[client,param])
    useEffect(() => {
    run(fetchProject(),{retry:fetchProject});
  }, [param,run,fetchProject]);
  return result
 }

 export const useEditProject = () =>{
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (param:Partial<ListType>) => 
    (run(client(`projects/${param.id}`,{data:param,method:'PATCH'})))
    return {mutate,...asyncResult}
 }
 export const useAddProject = () =>{
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (param:Partial<ListType>) => {
      run(client(`projects/${param.id}`,{data:param,method:'POST'}))
    }
    return {mutate,...asyncResult}
 }