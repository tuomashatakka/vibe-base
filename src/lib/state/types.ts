export type Theme = 'light' | 'dark' | 'system'

export interface Notice {
  id:      string
  kind:    'info' | 'success' | 'danger'
  message: string
}

export interface AppState {
  theme:     Theme
  panelOpen: boolean
  notices:   Notice[]
}

export const initialState: AppState = {
  theme:     'system',
  panelOpen: false,
  notices:   [],
}

// Discriminated action union — extend here first, reducer second, creators third.
export type AppAction =
  | { type: 'theme/set', theme: Theme } |
  { type: 'panel/toggle' } |
  { type: 'panel/set', open: boolean } |
  { type: 'notice/push', notice: Notice } |
  { type: 'notice/dismiss', id: string }
