import { baseApi } from '@/shared/api/baseApi'
import type { CreateTaskDto, Task } from '../model/types'

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
		})
	})
})

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi
