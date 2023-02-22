import React, { memo, useEffect, useState } from "react";
import cleanObject, { useDebounce, useMount } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import { useHttp } from "utils/http";
const ProjectListScreen = memo(() => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 800);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
});

export default ProjectListScreen;
