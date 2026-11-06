import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ProtectedRoute } from '@/features/auth'
import AdminLayout from './layouts/AdminLayout'
import { lazy } from 'react'

const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })))
const Projects = lazy(() => import('@/pages/Projects'))
const Tasks = lazy(() => import('@/pages/Tasks'))
const Profile = lazy(() => import('@/pages/Profile'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminProjects = lazy(() => import('@/pages/AdminProjects').then(m => ({ default: m.AdminProjects })))
const AdminUsers = lazy(() => import('@/pages/AdminUsers'))
const Forbidden = lazy(() => import('@/pages/Forbidden').then(m => ({ default: m.Forbidden })))
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })))

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login></Login>
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
						element: <AdminDashboard></AdminDashboard>,
						handle: { title: 'Статистика' }
					},
					{
						path: 'projects',
						element: <AdminProjects></AdminProjects>,
						handle: { title: 'Проекты' }
					},
					{
						path: 'users',
						element: <AdminUsers></AdminUsers>,
						handle: { title: 'Пользователи' }
					}
				]
			}
		]
	},
	{
		element: <ProtectedRoute></ProtectedRoute>,
		children: [
			{ path: '/403', element: <Forbidden></Forbidden> },
			{
				path: '/',
				element: <MainLayout></MainLayout>,
				children: [
					{
						index: true,
						element: <Dashboard></Dashboard>,
						handle: { title: 'Дашборд' }
					},
					{
						path: 'projects',
						element: <Projects></Projects>,
						handle: { title: 'Проекты' }
					},
					{
						path: 'tasks',
						element: <Tasks></Tasks>,
						handle: { title: 'Задачи' }
					},
					{
						path: 'profile',
						element: <Profile></Profile>,
						handle: { title: 'Профиль' }
					}
				]
			}
		]
	}
])

const AppRouter = () => <RouterProvider router={router}></RouterProvider>

export default AppRouter
