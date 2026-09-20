import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayouts'
import DashboardPage from '@/pages/DashboardPage'
import ProjectsPage from '@/pages/ProjectsPage'
import TasksPage from '@/pages/TasksPage'
import ProfilePage from '@/pages/ProfilePage'
import { ProtectedRoute } from '@/features/auth'
import { LoginPage } from '@/pages/LoginPage'

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage></LoginPage>
	},
	{
		element: <ProtectedRoute></ProtectedRoute>,
		children: [
			{
				path: '/',
				element: <MainLayout></MainLayout>,
				children: [
					{
						index: true,
						element: <DashboardPage></DashboardPage>
					},
					{
						path: 'projects',
						element: <ProjectsPage></ProjectsPage>
					},
					{
						path: 'tasks',
						element: <TasksPage></TasksPage>
					},
					{
						path: 'profile',
						element: <ProfilePage></ProfilePage>
					}
				]
			}
		]
	}
])

const AppRouter = () => <RouterProvider router={router}></RouterProvider>

export default AppRouter
