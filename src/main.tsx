import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.tsx'
import { ThemeProvider } from './app/providers/ThemeProvides.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './shared/ui/ErrorFallback.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ErrorBoundary
				onError={(error, info) => {
					console.error('Перехвачена ошибка:', error, info)
				}}
				FallbackComponent={ErrorFallback}
			>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ErrorBoundary>
		</Provider>
	</StrictMode>
)
