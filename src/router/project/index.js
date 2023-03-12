import React from 'react'
import { Navigate } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'

const KanbanScreen = React.lazy(() => import('screens/kanban'))
const routes = [
  {
    path: '',
    element: <Navigate to={'kanban'} replace={true} />,
  },
  {
    path: 'kanban',
    element: <KanbanScreen />,
  },
  {
    path: 'epic',
    element: <EpicScreen />,
  },
]
export default routes
