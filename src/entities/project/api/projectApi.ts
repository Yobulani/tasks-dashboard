import { baseApi } from '@/shared/api/baseApi'
import { type Project } from '../model/types'

export const projectApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getProjects: build.query<Project[], void>({
			query: () => '/projects',
			providesTags: ['Project']
		})
	})
})

export const { useGetProjectsQuery } = projectApi
