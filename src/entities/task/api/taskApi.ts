import { baseApi } from '@/shared/api/baseApi'
import type { CreateTaskDto, Task, UpdateTaskDto } from '../model/types'

export const taskApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getTasks: build.query<Task[], void>({
			query: () => '/tasks',
			providesTags: ['Task']
		}),
		createTask: build.mutation<Task, CreateTaskDto>({
			query: body => ({
				url: '/tasks',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Task']
		}),
		updateTask: build.mutation<Task, UpdateTaskDto>({
			query: ({ id, ...body }) => ({
				url: `/tasks/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['Task']
		}),
		removeTask: build.mutation<Task, string>({
			query: id => ({
				url: `/tasks/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Task']
		})
	})
})

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useRemoveTaskMutation
} = taskApi
