import type { RootState } from '@/app/store/store'

export const selectCurrentUser = (state: RootState) => state.auth.user

export const selectUserRole = (state: RootState) =>
	selectCurrentUser(state)?.role
