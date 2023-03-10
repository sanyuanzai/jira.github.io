import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox, Row } from "components/lib";
import UserSelect from "components/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import React from "react";
import { useProjectModal, useProjectsQueryKey } from "./util";

export default function ProjectModal() {
  const { close, projectModalOpen, isLoading, editingProject } =
    useProjectModal();
  const closeModal = () => {
    form.resetFields();
    close();
  };
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateProject(useProjectsQueryKey());
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      closeModal();
    });
  };
  const title = editingProject ? "编辑项目" : "创建项目";
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      width={"100%"}
      onClose={closeModal}
      open={projectModalOpen}
      forceRender={true}
    >
      <Container>
        {isLoading ? <Spin size="large"></Spin> : <h1>{title}</h1>}
        <ErrorBox error={error} />
        <Form
          form={form}
          layout="vertical"
          style={{ width: "40rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            label={"名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入项目名" }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item
            label={"部门"}
            name={"organization"}
            rules={[{ required: true, message: "请输入部门名" }]}
          >
            <Input placeholder="请输入部门名" />
          </Form.Item>
          <Form.Item label={"负责人"} name={"personId"}>
            <UserSelect defaultOptionName="负责人" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              loading={mutateLoading}
              type={"primary"}
              htmlType={"submit"}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
}
const Container = styled(Row)`
  flex-flow: column;
`;
