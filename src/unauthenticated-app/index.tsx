import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

export const UnauthenticatedApp = () => {
  const [isRigister, setIsRegter] = useState(false);
  return (
    <div>
      {isRigister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegter(!isRigister)}>
        切换到{isRigister ? "登录" : "注册"}
      </button>
      ;
    </div>
  );
};
