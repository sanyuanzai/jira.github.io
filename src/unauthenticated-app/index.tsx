import { Card, Divider, Typography } from "antd";
import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { ErrorBox } from "components/lib";

export const UnauthenticatedApp = () => {
  const [isRigister, setIsRegter] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRigister ? "请注册" : "请登录"}</Title>
        <ErrorBox error={error} />
        {isRigister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <a onClick={() => setIsRegter(!isRigister)}>
          {isRigister ? "已经有帐号了?直接登录" : "没有账号?注册新账号"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Header = styled.div`
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
  padding: 5rem 0;
  width: 100%;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(50vw - 23.2rem), calc(50vw - 23.2rem), cover;
  background-image: url(${left}), url(${right});
`;
const Title = styled.h2`
  color: rgb(94, 108, 132);
  margin-bottom: 3.2rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const ShadowCard = styled(Card)`
  height: 56rem;
  width: 40rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  text-align: center;
`;
