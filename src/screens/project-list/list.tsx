import styled from "@emotion/styled";
import { Dropdown, MenuProps, Space, Table, TableProps } from "antd";
import { NoPaddingButton } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { useAppDispatch } from "utils/usestore";
import { openProjectModal } from "./project-list.slice";
import { User } from "./search-panel";
export interface ListType {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: string;
  pin: boolean;
}
interface propsListType extends TableProps<ListType> {
  users: User[];
  refresh?: () => void;
}
const List = memo(({ users, ...props }: propsListType) => {
  const dispatch = useAppDispatch();
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Container>
      <Table
        pagination={false}
        columns={[
          {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
              return (
                <Pin
                  checked={project.pin}
                  onCheckedChange={pinProject(project.id)}
                />
              );
            },
          },
          {
            title: "名称",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
              return <Link to={String(project.id)}>{project.name}</Link>;
            },
          },
          {
            title: "部门",
            dataIndex: "organization",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: "负责人",
            render(value, project) {
              return (
                <span>
                  {users.find((user) => user.id === project.personId)?.name ||
                    "未知"}
                </span>
              );
            },
          },
          {
            title: "创建时间",
            render(value, project) {
              return (
                <span>
                  {project.created
                    ? dayjs(project.created).format("YYYY-MM-DD")
                    : "无"}
                </span>
              );
            },
          },
          {
            render(value, project) {
              const items: MenuProps["items"] = [
                {
                  key: "edit",
                  label: (
                    <NoPaddingButton
                      type="link"
                      onClick={() => dispatch(openProjectModal())}
                    >
                      编辑
                    </NoPaddingButton>
                  ),
                },
                {
                  key: "delete",
                  label: <NoPaddingButton type="link">删除</NoPaddingButton>,
                },
              ];
              return (
                <Dropdown menu={{ items }}>
                  <Space>
                    <NoPaddingButton
                      type={"link"}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        <NoPaddingButton type="link">...</NoPaddingButton>
                      </Space>
                    </NoPaddingButton>
                  </Space>
                </Dropdown>
              );
            },
          },
        ]}
        {...props}
      ></Table>
    </Container>
  );
});
const Container = styled.div``;

export default List;
