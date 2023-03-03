import { useAuth } from "context/auth-context";
import React, { memo } from "react";
import { Button, Form, Input } from "antd";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";
const LoginScreen = memo(({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { isLoadding, run } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error: any) {
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? `登录成功,用户名:${user.name}` : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoadding} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
});
export const LongButton = styled(Button)`
  width: 100%;
`;
export default LoginScreen;
