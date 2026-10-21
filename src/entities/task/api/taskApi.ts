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
		updateTask: build.mutation<Task, UpdateTaskDto>({
			query: ({ id, ...body }) => ({
				url: `/tasks/${id}`,
				method: 'PUT',
				body
			}),
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				let taskTitle = 'Задача'

				const patchResult = dispatch(
					taskApi.util.updateQueryData('getTasks', undefined, draft => {
						const task = draft.find(t => t.id === id)

						if (task) {
							taskTitle = `"${task.title}"`
							Object.assign(task, patch)
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
