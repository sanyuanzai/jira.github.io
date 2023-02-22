import { Table } from "antd";
import React, { memo } from "react";
import { User } from "./search-panel";
interface ListType {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
}
interface propsListType {
  list: ListType[];
  users: User[];
}
const List = memo(({ list, users }: propsListType) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
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
      ]}
      dataSource={list}
    ></Table>
  );
});

export default List;
