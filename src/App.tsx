import { Toaster } from 'sonner'
import AppRouter from './app/router'

const App = () => {
	return (
		<>
			<AppRouter></AppRouter>
			<Toaster
				richColors
				position='top-right'
			></Toaster>
		</>
	)
}

export default App
