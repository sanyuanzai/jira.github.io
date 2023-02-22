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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default List;
