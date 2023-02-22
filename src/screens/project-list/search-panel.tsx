import { Input, Select } from "antd";
import React, { memo } from "react";
export interface User {
  name: string;
  id: string;
  token: string;
}
interface propsSearchPanelType {
  param: { name: string; personId: string };
  setParam: (param: propsSearchPanelType["param"]) => void;
  users: User[];
}
const SearchPanel = memo(({ param, setParam, users }: propsSearchPanelType) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
});

export default SearchPanel;
