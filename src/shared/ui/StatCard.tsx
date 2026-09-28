interface StatCardProp {
	label: string
	value: number
}

export const StatCard = ({ label, value }: StatCardProp) => {
	return (
		<div className='bg-card rounded-lg p-6 border border-border shadow-sm'>
			<p className='text-sm text-foreground-muted'>{label}</p>
			<p className='text-3xl font-bold mt-2 text-foreground'>{value}</p>
		</div>
	)
}
