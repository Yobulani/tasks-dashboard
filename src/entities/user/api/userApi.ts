import { baseApi } from '@/shared/api/baseApi'
import { type User } from '../model/types'

export const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getUsers: build.query<User[], void>({
			query: () => '/users',
			providesTags: ['User']
		})
	})
})

export const { useGetUsersQuery } = userApi
