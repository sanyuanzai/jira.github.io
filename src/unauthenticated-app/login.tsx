import { useAuth } from "context/auth-context";
import React, { memo, FormEvent } from "react";
const LoginScreen = memo(() => {
  const { login, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? `登录成功,用户名:${user.name}` : null}
      <div>
        <label htmlFor="uesername">用户名</label>
      </div>
      <input type="text" id={"username"} />
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
});

export default LoginScreen;
