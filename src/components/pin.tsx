import React from "react";
import { Rate } from "antd";

type RateType = React.Component;
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: Boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...restprops }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restprops}
    />
  );
};
