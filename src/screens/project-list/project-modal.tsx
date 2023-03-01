import { Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";
interface ProjectModalPropsType {
  projectModalOpen: boolean;
  onClose: () => void;
}
export default function ProjectModal() {
  const { close: closeModal, projectModalOpen } = useProjectModal();
  return (
    <Drawer width={"100%"} onClose={closeModal} open={projectModalOpen}>
      <h1>Project Modal</h1>
    </Drawer>
  );
}
