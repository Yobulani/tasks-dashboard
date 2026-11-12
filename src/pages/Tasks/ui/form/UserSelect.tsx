import { useGetUsersQuery } from '@/entities/user'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from '@/components/ui/combobox'
import { useMemo } from 'react'

interface UserSelectProps {
	value: string | null
	onChange: (value: string | null) => void
}

export const UserSelect = ({ value, onChange }: UserSelectProps) => {
	const { data: users } = useGetUsersQuery()

	const items = useMemo(
		() => [
			{ label: 'Исполнитель не назначен', value: '' },
			...(users?.map(user => ({ label: user.name, value: user.id })) ?? [])
		],
		[users]
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
				placeholder='Выберите пользователя...'
				className='w-full'
			/>
			<ComboboxContent>
				<ComboboxEmpty>Пользователь не найден</ComboboxEmpty>
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
