import { Button, Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTaskQueryKey } from "./util";

export default function CreateTask({ kanbanId }: { kanbanId: number }) {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const projectId = useProjectIdInUrl();

  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const submit = async () => {
    await addTask({ projectId, kanbanId, name });
    setInputMode(false);
    setName("");
  };
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);
  return (
    <div>
      {inputMode ? (
        <Card style={{ marginBottom: "0.5rem" }}>
          <Input
            placeholder="需要做些什么"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            onPressEnter={submit}
          ></Input>
        </Card>
      ) : (
        <Button type="link" onClick={() => setInputMode(true)}>
          +创建事务
        </Button>
      )}
    </div>
  );
}
