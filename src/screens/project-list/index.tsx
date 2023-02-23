import React, { memo, useState } from "react";
import { useDebounce } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import useUser from "utils/user";
const ProjectListScreen = memo(() => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 800);
  const { isLoadding, isError, data: list, error } = useProject(debounceParam);
  const { data: users } = useUser();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {isError ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoadding} />
    </Container>
  );
});
const Container = styled.div`
  padding: 3.2rem;
`;
export default ProjectListScreen;
