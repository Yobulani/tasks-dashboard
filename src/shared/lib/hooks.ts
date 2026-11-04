import type { RootState } from '@/app/store/types'
import type { AppDispatch } from 'recharts/types/state/store'
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
	useSelector(selector)
