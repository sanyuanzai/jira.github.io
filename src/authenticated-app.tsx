import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <PageHeader bettween={true}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>组员</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
  padding: 0 1.5rem;
`;
const PageHeader = styled(Row)``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
