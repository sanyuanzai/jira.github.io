import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, MenuProps, Space } from "antd";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useRoutes,
} from "react-router-dom";
import ProjectScreen from "screens/project";
import { resetRoute } from "utils";
import routes from "router";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {useRoutes(routes)}
        {/* <BrowserRouter>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route path={"/"} element={<Navigate to={"projects"} />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </BrowserRouter> */}
      </Main>
    </Container>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <h3 onClick={logout}>登出</h3>,
    },
  ];
  return (
    <Header bettween={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </Button>
        <h2>项目</h2>
        <h2>组员</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Space>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h2 style={{ color: "rgb(38,132,255)" }}>Hi,{user?.name}</h2>
              </Space>
            </a>
          </Space>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
