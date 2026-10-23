import { baseApi } from '@/shared/api/baseApi'
import type { CreateTaskDto, Task, UpdateTaskDto } from '../model/types'
import { toast } from 'sonner'

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
		moveTask: build.mutation<Task, Pick<UpdateTaskDto, 'id' | 'status'>>({
			query: ({ id, ...body }) => ({
				url: `/tasks/${id}`,
				method: 'PATCH',
				body
			}),
			async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
				let taskTitle = 'Задача'

				const patchResult = dispatch(
					taskApi.util.updateQueryData('getTasks', undefined, draft => {
						const task = draft.find(t => t.id === id)

						if (task) {
							taskTitle = `"${task.title}"`
							Object.assign(task, { id, status })
						}
					})
				)

				try {
					await queryFulfilled

					toast.success(`${taskTitle} перемещена`)
				} catch (e) {
					patchResult.undo()
					toast.error(`Перемещение не удалось`)
				}
			}
		}),
		updateTask: build.mutation<Task, UpdateTaskDto>({
			query: ({ id, ...body }) => ({
				url: `/tasks/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['Task'],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled

					toast.success(`Задача обновлена`)
				} catch (e) {
					toast.error(`Не удалось обновить задачу`)
				}
			}
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
	useMoveTaskMutation,
	useRemoveTaskMutation
} = taskApi
