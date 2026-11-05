import type { UserRole } from '@/shared/config'

export interface User {
	id: string
	name: string
	email: string
	role: UserRole
	avatarUrl?: string
	createdAt?: string
}

export type CreateUserDto = Omit<User, 'id'>

export type UpdateUserDto = { id: string } & Partial<User>
