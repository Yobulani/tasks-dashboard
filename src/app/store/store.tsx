import { AuthPersistenceMiddleware } from '@/app/middleware/AuthPersistenceMiddleware'
import { ThemePersistenceMiddleware } from '@/app/middleware/ThemePersistenceMiddleware'
import { AuthReducer } from '@/features/auth'
import { ThemeReducer } from '@/features/theme'
import { baseApi } from '@/shared/api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		theme: ThemeReducer,
		[baseApi.reducerPath]: baseApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.prepend(ThemePersistenceMiddleware.middleware)
			.prepend(AuthPersistenceMiddleware.middleware)
			.concat(baseApi.middleware)
})
