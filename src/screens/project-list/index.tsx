import { useDebounce, useDocumentTitle } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import useUser from "utils/user";
import { useProjectSearchParam } from "./util";
const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParam();
  const {
    isLoadding,
    data: list,
    error,
    retry,
  } = useProject(useDebounce(param, 500));
  const { data: users } = useUser();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List
        users={users || []}
        dataSource={list || []}
        loading={isLoadding}
        refresh={retry}
      />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
export default ProjectListScreen;
