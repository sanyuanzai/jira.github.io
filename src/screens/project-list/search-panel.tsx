/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
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
    <Form css={{ marginBottom: "2em" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="项目名"
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default SearchPanel;
