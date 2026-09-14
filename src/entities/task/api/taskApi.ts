import { baseApi } from '@/shared/api/baseApi'
import type { Task } from '../model/types'

export const taskApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getTasks: build.query<Task[], void>({
			query: () => '/tasks',
			providesTags: ['Task']
		})
	})
})

export const { useGetTasksQuery } = taskApi
