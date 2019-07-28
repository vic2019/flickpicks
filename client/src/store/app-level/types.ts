export const SHOW_WAITING = 'SHOW_WAITING'
export const HIDE_WAITING = 'HIDE_WAITING'
export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'

export interface AppLevel {
  waiting: boolean
  error: boolean
  errorMsg: string
}

interface ShowWaitingAction {
  type: typeof SHOW_WAITING
}

interface HideWaitingAction {
  type: typeof HIDE_WAITING
}

interface ShowErrorAction {
  type: typeof SHOW_ERROR
  msg: string | undefined | null
}

interface HideErrorAction {
  type: typeof HIDE_ERROR
}

export type AppLevelActionTypes = ShowWaitingAction | HideWaitingAction | ShowErrorAction | HideErrorAction