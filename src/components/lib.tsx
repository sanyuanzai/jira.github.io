import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
export const Row = styled.div<{
  gap?: Number | Boolean;
  bettween?: Boolean;
}>`
  display: flex;
  justify-content: ${(props) => (props.bettween ? "space-between" : undefined)};
  align-items: center;
  > * {
    margin-top: 0 !important ;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </FullPage>
  );
};

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};
