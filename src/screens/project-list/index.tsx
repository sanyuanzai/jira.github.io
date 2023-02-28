import React, { memo } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import useUser from "utils/user";
import { useUrlQueryParam } from "utils/url";
const ProjectListScreen = memo(() => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param, 500);
  const { isLoadding, isError, data: list, error } = useProject(debounceParam);
  const { data: users } = useUser();
  useDocumentTitle("项目列表", false);
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
