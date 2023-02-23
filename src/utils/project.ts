import { useEffect } from "react";
import { ListType } from "screens/project-list/list";
import cleanObject from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

 

 export const useProject = (param:Partial<ListType>) =>{
    const {run,...result} = useAsync<ListType[]>()
    const client = useHttp()
    useEffect(() => {
    run(client("projects", { data: cleanObject(param) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result
 }