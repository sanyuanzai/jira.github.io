import React, { memo, useEffect, useState } from "react";
import cleanObject, { useDebounce, useMount } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
const ProjectListScreen = memo(() => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounce = useDebounce(param, 800);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(param);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounce))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [debounce]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
});

export default ProjectListScreen;
