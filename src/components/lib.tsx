import styled from "@emotion/styled";
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
