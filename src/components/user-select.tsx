import React, { memo } from "react";
import useUser from "utils/user";
import IdSelect from "./id-selcet";

const UserSelect = memo((props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
});

export default UserSelect;
