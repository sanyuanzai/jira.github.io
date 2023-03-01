import styled from "@emotion/styled";
import { Popover, Typography, List, Divider } from "antd";
import { openProjectModal } from "screens/project-list/project-list.slice";
import { useProject } from "utils/project";
import { useAppDispatch } from "utils/usestore";
import { NoPaddingButton } from "./lib";

export default function ProjectPopover() {
  const dispatch = useAppDispatch();
  const { data: projects, isLoadding } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <NoPaddingButton
        type={"link"}
        onClick={() => dispatch(openProjectModal())}
      >
        创建项目
      </NoPaddingButton>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <h2>项目</h2>
    </Popover>
  );
}
const ContentContainer = styled.div`
  min-width: 30rem;
`;
