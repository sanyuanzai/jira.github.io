import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { NoPaddingButton, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { useRoutes } from "react-router-dom";
import { resetRoute } from "utils";
import routes from "router";
import ProjectModal from "screens/project-list/project-modal";
import ProjectPopover from "components/project-popover";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>{useRoutes(routes)}</Main>
      <ProjectModal />
    </Container>
  );
};
const PageHeader = () => {
  return (
    <Header bettween={true}>
      <HeaderLeft gap={true}>
        <NoPaddingButton type="link" onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </NoPaddingButton>
        <ProjectPopover />
        <h2>组员</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <h3 onClick={logout}>登出</h3>,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Space>
        <Button type={"link"} onClick={(e) => e.preventDefault()}>
          <Space>
            <h2 style={{ color: "rgb(38,132,255)" }}>Hi,{user?.name}</h2>
          </Space>
        </Button>
      </Space>
    </Dropdown>
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
