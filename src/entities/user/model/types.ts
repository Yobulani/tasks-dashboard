import type { UserRole } from '@/shared/constants/user'

export interface User {
	id: string
	name: string
	email: string
	role: UserRole
	avatarUrl?: string
}

export type CreateUserDto = Omit<User, 'id'>

export type UpdateUserDto = { id: string } & Partial<User>
