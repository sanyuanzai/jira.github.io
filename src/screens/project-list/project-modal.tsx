import { Drawer } from "antd";
import React from "react";
interface ProjectModalPropsType {
  projectModalOpen: boolean;
  onClose: () => void;
}
export default function ProjectModal(props: ProjectModalPropsType) {
  return (
    <Drawer
      width={"100%"}
      onClose={props.onClose}
      open={props.projectModalOpen}
    >
      <h1>Project Modal</h1>
    </Drawer>
  );
}
