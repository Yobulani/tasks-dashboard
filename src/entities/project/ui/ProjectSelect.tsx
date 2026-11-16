import { useGetProjectsQuery } from '@/entities/project'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from '@/components/ui/combobox'
import { useMemo } from 'react'

interface ProjectSelectProps {
	value: string
	onChange: (value: string | null) => void
}

export const ProjectSelect = ({ value, onChange }: ProjectSelectProps) => {
	const { data: projects } = useGetProjectsQuery()

	const items = useMemo(
		() =>
			projects?.map(project => ({
				label: project.name,
				value: project.id
			})) ?? [],
		[projects]
	)

	const selectedItem = useMemo(
		() => items.find(item => item.value === value),
		[items, value]
	)

	return (
		<Combobox
			items={items}
			value={selectedItem ?? null}
			onValueChange={v => onChange(!v ? null : v.value)}
		>
			<ComboboxInput
				placeholder='Выберите проект...'
				className='w-full'
			/>
			<ComboboxContent>
				<ComboboxEmpty>Проект не найден</ComboboxEmpty>
				<ComboboxList>
					{(item: (typeof items)[number]) => (
						<ComboboxItem
							value={item}
							key={item.value}
						>
							{item.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	)
}
