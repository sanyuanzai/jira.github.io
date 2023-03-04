import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TaskTypeSelect from "components/task-type-select";
import UserSelect from "components/user-select";
import React, { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTaskQueryKey } from "./util";

export default function TaskModal() {
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTaskQueryKey()
  );
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  const onCancel = () => {
    form.resetFields();
    close();
  };
  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定?",
      cancelText: "取消",
      onOk: async () => {
        await deleteTask({ id: Number(editingTaskId) });
        close();
      },
      title: "确定删除任务吗",
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);
  return (
    <Modal
      open={!!editingTaskId}
      okText={"确定"}
      cancelText={"取消"}
      onCancel={onCancel}
      onOk={onOk}
      title={"编辑任务"}
    >
      <Form {...layout} form={form} initialValues={editingTask}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button type="link" size="small" onClick={startDelete}>
            删除
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
