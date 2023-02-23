import { useAuth } from "context/auth-context";
import { memo } from "react";
import { Form, Input } from "antd";
import { LongButton } from "./login";
import { useAsync } from "utils/use-async";
const LoginScreen = memo(({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { isLoadding, run } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (values.password !== cpassword) {
      onError(new Error("请检查两次密码是否相同!"));
      return;
    }
    try {
      await run(register(values));
    } catch (error: any) {
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="cpassword" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoadding} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
});

export default LoginScreen;
