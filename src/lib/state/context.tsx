'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { reducer } from './reducer'
import { initialState } from './types'
import type { AppAction, AppState } from './types'


const StateContext    = createContext<AppState>(initialState)
const DispatchContext = createContext<Dispatch<AppAction>>(() => undefined)

StateContext.displayName    = 'AppStateContext'
DispatchContext.displayName = 'AppDispatchContext'

type AppStateProviderProps = { children: ReactNode }

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme
  }, [ state.theme ])

  return <StateContext.Provider value={ state }>
    <DispatchContext.Provider value={ dispatch }>
      {children}
    </DispatchContext.Provider>
  </StateContext.Provider>
}

export const useAppState = () => useContext(StateContext)
export const useDispatch = () => useContext(DispatchContext)
