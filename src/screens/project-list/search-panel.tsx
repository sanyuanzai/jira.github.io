import { Form, Input } from "antd";
import UserSelect from "components/user-select";
import { ListType } from "../../types/ListType";
import { User } from "../../types/User";
import React from "react";
interface propsSearchPanelType {
  param: Partial<Pick<ListType, "name" | "personId">>;
  setParam: (param: propsSearchPanelType["param"]) => void;
  users: User[];
}
const SearchPanel = ({ param, setParam, users }: propsSearchPanelType) => {
  return (
    <Form style={{ marginBottom: "2em" }} layout="inline">
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
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
