import styled from "@emotion/styled";
import { Dropdown, MenuProps, Table, TableProps } from "antd";
import { NoPaddingButton } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
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
                  key: "1",
                  label: <NoPaddingButton type="link">编辑</NoPaddingButton>,
                },
                {
                  key: "2",
                  label: <NoPaddingButton type="link">删除</NoPaddingButton>,
                },
              ];
              return (
                <Dropdown menu={{ items }}>
                  <NoPaddingButton type="link">...</NoPaddingButton>
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
