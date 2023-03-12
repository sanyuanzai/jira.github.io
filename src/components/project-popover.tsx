import styled from '@emotion/styled'
import { Popover, Typography, List, Divider, Button } from 'antd'
import React from 'react'
import { useProjectModal } from 'screens/project-list/util'
import { useProject } from 'utils/project'
import { NoPaddingButton } from './lib'

export default function ProjectPopover() {
  const { data: projects, refetch } = useProject()
  const { open: openModal } = useProjectModal()
  const pinnedProjects = projects?.filter((project) => project.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type='secondary'>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <NoPaddingButton type={'link'} onClick={openModal}>
        创建项目
      </NoPaddingButton>
    </ContentContainer>
  )
  return (
    <Popover
      onOpenChange={() => refetch()}
      placement={'bottom'}
      content={content}
    >
      <h2>项目</h2>
    </Popover>
  )
}
const ContentContainer = styled.div`
  min-width: 30rem;
`
