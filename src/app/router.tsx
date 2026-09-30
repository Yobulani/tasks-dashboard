import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayouts'
import { ProtectedRoute } from '@/features/auth'
import AdminLayout from './layouts/AdminLayout'
import { lazy } from 'react'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const TasksPage = lazy(() => import('@/pages/TasksPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'))
const AdminProjectsPage = lazy(() => import('@/pages/AdminProjectsPage'))
const AdminUsersPage = lazy(() => import('@/pages/AdminUsersPage'))
const ForbiddenPage = lazy(() => import('@/pages/ForbiddenPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))

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
						element: <AdminDashboardPage></AdminDashboardPage>,
						handle: { title: 'Статистика' }
					},
					{
						path: 'projects',
						element: <AdminProjectsPage></AdminProjectsPage>,
						handle: { title: 'Проекты' }
					},
					{
						path: 'users',
						element: <AdminUsersPage></AdminUsersPage>,
						handle: { title: 'Пользователи' }
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
						element: <DashboardPage></DashboardPage>,
						handle: { title: 'Дашборд' }
					},
					{
						path: 'projects',
						element: <ProjectsPage></ProjectsPage>,
						handle: { title: 'Проекты' }
					},
					{
						path: 'tasks',
						element: <TasksPage></TasksPage>,
						handle: { title: 'Задачи' }
					},
					{
						path: 'profile',
						element: <ProfilePage></ProfilePage>,
						handle: { title: 'Профиль' }
					}
				]
			}
		]
	}
])

const AppRouter = () => <RouterProvider router={router}></RouterProvider>

export default AppRouter
