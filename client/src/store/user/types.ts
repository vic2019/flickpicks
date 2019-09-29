export const WILL_REDIRECT_TO_AUTH_UI = 'WILL_REDIRECT_TO_AUTH_UI'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export interface User {
  returningFromRedirect: boolean
  isLoggedIn: boolean
  token: string
  email: string
}

interface WillRedirectToAuthUIAction {
  type: typeof WILL_REDIRECT_TO_AUTH_UI
}

interface LogInAction {
  type: typeof LOG_IN
  payload: {
    token: string
    email: string
  }
}

interface LogOutAction {
  type: typeof LOG_OUT
}

export type UserActionTypes = LogInAction | LogOutAction | WillRedirectToAuthUIAction