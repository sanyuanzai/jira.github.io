import { Button, Dropdown, MenuProps, Modal, Space } from "antd";
import React from "react";
import { useDeleteKanban } from "utils/kanban";
import { useKanbanQueryKey } from "./util";

export default function DeleteKanban({ kanbanId }: { kanbanId: number }) {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗?",
      onOk() {
        deleteKanban({ id: kanbanId });
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "delete",
      label: (
        <Button type="link" onClick={startDelete}>
          删除
        </Button>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button type="link" onClick={(e) => e.preventDefault}>
        <Space>...</Space>
      </Button>
    </Dropdown>
  );
}
