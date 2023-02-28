import styled from "@emotion/styled";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { User } from "./search-panel";
export interface ListType {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: string;
  pin: Boolean;
}
interface propsListType extends TableProps<ListType> {
  users: User[];
}
const List = memo(({ users, ...props }: propsListType) => {
  return (
    <Container>
      <Table
        pagination={false}
        columns={[
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
        ]}
        {...props}
      ></Table>
    </Container>
  );
});
const Container = styled.div``;

export default List;
