import { AppLevelActionTypes } from '../app-level/types';

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const RESTORE_DATA_AFTER_REDIRECT = 'RESTORE_DATA_AFTER_REDIRECT'

export interface User {
  token: string
  email: string
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

export type UserActionTypes = LogInAction | LogOutAction | AppLevelActionTypes