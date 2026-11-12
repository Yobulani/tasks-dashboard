export const USER_ROLE_OPTIONS = [
	{ value: 'admin', label: 'Администратор' },
	{ value: 'user', label: 'Пользователь' }
] as const

export type UserRole = (typeof USER_ROLE_OPTIONS)[number]['value']

export const USER_ROLES = USER_ROLE_OPTIONS.map(option => option.value)
