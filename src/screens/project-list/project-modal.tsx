import { Drawer } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "utils/usestore";
import { closeProjectModal } from "./project-list.slice";

export default function ProjectModal() {
  const dispatch = useAppDispatch();
  const projectModalOpen = useAppSelector(
    (state) => state.projectList.projectModalOpen
  );
  return (
    <Drawer
      width={"100%"}
      onClose={() => dispatch(closeProjectModal())}
      open={projectModalOpen}
    >
      <h1>Project Modal</h1>
    </Drawer>
  );
}
