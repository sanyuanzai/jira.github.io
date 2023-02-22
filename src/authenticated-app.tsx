import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, MenuProps, Space } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a href="" onClick={logout}>
          登出
        </a>
      ),
    },
  ];
  return (
    <Container>
      <PageHeader bettween={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
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
`;
const PageHeader = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
