import { baseApi } from '@/shared/api'
import {
	type CreateProjectDto,
	type Project,
	type UpdateProjectDto
} from '../model/types'

export const projectApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getProjects: build.query<Project[], void>({
			query: () => '/projects',
			providesTags: ['Project']
		}),
		createProject: build.mutation<Project, CreateProjectDto>({
			query: body => ({
				url: '/projects',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Project']
		}),
		updateProject: build.mutation<Project, UpdateProjectDto>({
			query: ({ id, ...body }) => ({
				url: `/projects/${id}`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: ['Project']
		}),
		removeProject: build.mutation<Project, string>({
			query: id => ({
				url: `/projects/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Project']
		})
	})
})

export const {
	useGetProjectsQuery,
	useCreateProjectMutation,
	useUpdateProjectMutation,
	useRemoveProjectMutation
} = projectApi
