import { baseApi } from '@/shared/api/baseApi'
import {
	type CreateUserDto,
	type UpdateUserDto,
	type User
} from '../model/types'

export const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getUsers: build.query<User[], void>({
			query: () => '/users',
			providesTags: ['User']
		}),
		createUser: build.mutation<User, CreateUserDto>({
			query: body => ({
				url: '/users',
				method: 'POST',
				body
			}),
			invalidatesTags: ['User']
		}),
		updateUser: build.mutation<User, UpdateUserDto>({
			query: ({ id, ...body }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['User']
		}),
		removeUser: build.mutation<User, string>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['User']
		})
	})
})

export const {
	useGetUsersQuery,
	useCreateUserMutation,
	useRemoveUserMutation,
	useUpdateUserMutation
} = userApi
