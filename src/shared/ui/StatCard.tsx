interface StatCardProp {
	label: string
	value: number
}

export const StatCard = ({ label, value }: StatCardProp) => {
	return (
		<div className='bg-white rounded-lg p-6 border border-gray-200 shadow-sm'>
			<p className='text-sm text-gray-500'>{label}</p>
			<p className='text-3xl font-bold mt-2 text-gray-800'>{value}</p>
		</div>
	)
}
