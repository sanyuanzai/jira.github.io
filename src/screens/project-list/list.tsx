import styled from "@emotion/styled";
import { Dropdown, MenuProps, Modal, Table, TableProps } from "antd";
import { NoPaddingButton } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { User } from "./search-panel";
import { useProjectModal, useProjectsQueryKey } from "./util";
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
}
const List = memo(({ users, ...props }: propsListType) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
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
              return <More project={project} />;
            },
          },
        ]}
        {...props}
      ></Table>
    </Container>
  );
});
const More = ({ project }: { project: ListType }) => {
  const { startEdit } = useProjectModal();
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: (
        <NoPaddingButton type="link" onClick={() => startEdit(project.id)}>
          编辑
        </NoPaddingButton>
      ),
    },
    {
      key: "delete",
      label: (
        <NoPaddingButton
          type="link"
          onClick={() => confirmDeleteProject(project.id)}
        >
          删除
        </NoPaddingButton>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <NoPaddingButton type="link">...</NoPaddingButton>
    </Dropdown>
  );
};

const Container = styled.div``;

export default List;
