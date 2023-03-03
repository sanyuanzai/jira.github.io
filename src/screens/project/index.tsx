import styled from "@emotion/styled";
import { Menu } from "antd";
import { ScreenContainer } from "components/lib";
import React, { memo } from "react";
import { Link, useLocation, useRoutes } from "react-router-dom";
import routes from "router/project";

const ProjectScreen = memo(() => {
  const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
  };
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[useRouteType()]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>{useRoutes(routes)}</Main>
    </Container>
  );
});
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
export default ProjectScreen;
