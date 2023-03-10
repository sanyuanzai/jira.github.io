import { Button, Input } from "antd";
import { Row } from "components/lib";
import TaskTypeSelect from "components/task-type-select";
import UserSelect from "components/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./util";

export default function SearchPanel() {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row gap={true} style={{ marginBottom: "3.6rem" }}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      ></Input>
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      ></UserSelect>
      <TaskTypeSelect
        defaultOptionName="项目类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
}
