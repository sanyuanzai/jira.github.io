import { useDebounce, useDocumentTitle } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import useUser from "utils/user";
import { useProjectModal, useProjectSearchParam } from "./util";
import { ErrorBox, NoPaddingButton, Row } from "components/lib";
const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open: openModal } = useProjectModal();
  const [param, setParam] = useProjectSearchParam();
  const { isLoading, data: list, error } = useProject(useDebounce(param, 500));
  const { data: users } = useUser();
  return (
    <Container>
      <Row bettween={true}>
        <h1>项目列表</h1>
        <NoPaddingButton type="link" onClick={openModal}>
          创建项目
        </NoPaddingButton>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
export default ProjectListScreen;
