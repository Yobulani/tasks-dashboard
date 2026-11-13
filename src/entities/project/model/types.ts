export interface Project {
	id: string
	name: string
	description: string
	ownerId: string
	taskCount: number
}

export type CreateProjectDto = Omit<Project, 'id' | 'taskCount'>

export type UpdateProjectDto = { id: string } & Partial<CreateProjectDto>
