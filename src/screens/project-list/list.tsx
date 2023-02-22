import styled from "@emotion/styled";
import { Table } from "antd";
import dayjs from "dayjs";
import React, { memo } from "react";
import { User } from "./search-panel";
interface ListType {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
  pin: Boolean;
}
interface propsListType {
  list: ListType[];
  users: User[];
}
const List = memo(({ list, users }: propsListType) => {
  return (
    <Container>
      <Table
        pagination={false}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
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
        dataSource={list}
      ></Table>
    </Container>
  );
});
const Container = styled.div``;

export default List;
