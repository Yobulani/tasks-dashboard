import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ProtectedRoute } from '@/features/auth'
import AdminLayout from './layouts/AdminLayout'
import { lazyImport } from '@/shared/lib'

const Dashboard = lazyImport(() => import('@/pages/Dashboard'), 'Dashboard')
const Projects = lazyImport(() => import('@/pages/Projects'), 'Projects')
const Tasks = lazyImport(() => import('@/pages/Tasks'), 'Tasks')
const Profile = lazyImport(() => import('@/pages/Profile'), 'Profile')
const AdminDashboard = lazyImport(() => import('@/pages/AdminDashboard'), 'AdminDashboard')
const AdminProjects = lazyImport(() => import('@/pages/AdminProjects'), 'AdminProjects')
const AdminUsers = lazyImport(() => import('@/pages/AdminUsers'), 'AdminUsers')
const Forbidden = lazyImport(() => import('@/pages/Forbidden'), 'Forbidden')
const Login = lazyImport(() => import('@/pages/Login'), 'Login')

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
