import { useMatches } from 'react-router-dom'

interface RouteHandle {
	title?: string
}

export const useRouteTitle = () => {
	const matches = useMatches()
	const match = matches?.findLast(m => (m.handle as RouteHandle)?.title)

	return (match?.handle as RouteHandle)?.title ?? ''
}
