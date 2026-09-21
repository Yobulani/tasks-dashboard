import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayouts'
import DashboardPage from '@/pages/DashboardPage'
import ProjectsPage from '@/pages/ProjectsPage'
import TasksPage from '@/pages/TasksPage'
import ProfilePage from '@/pages/ProfilePage'
import { ProtectedRoute } from '@/features/auth'
import { LoginPage } from '@/pages/LoginPage'
import AdminLayout from './layouts/AdminLayout'
import { AdminDashboardPage } from '@/pages/AdminDashboardPage'
import { AdminProjectsPage } from '@/pages/AdminProjectsPage'
import { AdminUsersPage } from '@/pages/AdminUsersPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage></LoginPage>
	},
	{
		element: <ProtectedRoute requiredRole='admin'></ProtectedRoute>,
		children: [
			{
				path: '/admin',
				element: <AdminLayout></AdminLayout>,
				children: [
					{
						index: true,
						element: <AdminDashboardPage></AdminDashboardPage>
					},
					{
						path: 'projects',
						element: <AdminProjectsPage></AdminProjectsPage>
					},
					{
						path: 'users',
						element: <AdminUsersPage></AdminUsersPage>
					}
				]
			}
		]
	},
	{
		element: <ProtectedRoute></ProtectedRoute>,
		children: [
			{ path: '/403', element: <ForbiddenPage></ForbiddenPage> },
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
