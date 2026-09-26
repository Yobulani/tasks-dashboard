import { useGetTasksQuery } from '@/entities/task'
import { selectTasksByPriority, selectTasksByStatus } from '../model/selectors'
import {
	Bar,
	BarChart,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const STATUS_COLORS = ['#94a3b8', '#3b82f6', '#22c55e']
const PRIORITY_COLORS = ['#22c55e', '#f59e0b', '#ef4444']

export const TaskStats = () => {
	const { stats } = useGetTasksQuery(undefined, {
		selectFromResult: ({ data }) => ({
			stats: {
				byStatus: selectTasksByStatus(data ?? []),
				byPriority: selectTasksByPriority(data ?? [])
			}
		})
	})

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
			<div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
				<h3 className='text-lg font-semibold mb-4'>Задачи по статусам</h3>

				<ResponsiveContainer
					width='100%'
					height={300}
				>
					<PieChart>
						<Pie
							data={stats.byStatus.map((item, i) => ({
								...item,
								fill: STATUS_COLORS[i]
							}))}
							nameKey='name'
							dataKey='value'
							cx='50%'
							cy='50%'
							outerRadius={100}
						></Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
				<h3 className='text-lg font-semibold mb-4'>Задачи по статусам</h3>

				<ResponsiveContainer
					width='100%'
					height={300}
				>
					<BarChart
						data={stats.byPriority.map((item, i) => ({
							...item,
							fill: PRIORITY_COLORS[i]
						}))}
					>
						<XAxis dataKey='name'></XAxis>
						<YAxis allowDecimals={false}></YAxis>
						<Tooltip />
						<Bar dataKey='value' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
