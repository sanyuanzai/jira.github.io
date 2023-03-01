import { useEffect } from "react";
import { ListType } from "screens/project-list/list";
import cleanObject from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

 

 export const useProject = (param:Partial<ListType>) =>{
    const {run,...result} = useAsync<ListType[]>()
    const client = useHttp()
    const fetchProject = ()=>client("projects", { data: cleanObject(param) })
    useEffect(() => {
    run(fetchProject(),{retry:fetchProject});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
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