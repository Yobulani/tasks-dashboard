import { baseApi } from '@/shared/api'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

export function renderWithProviders(ui: React.ReactElement) {
	const testStore = configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(baseApi.middleware)
	})

	return render(<Provider store={testStore}>{ui}</Provider>)
}
