import { useCallback, useEffect, useRef } from 'react'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux'

export const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
