import {
  LOG_IN,
  LOG_OUT,
  WILL_REDIRECT_TO_AUTH_UI,
  User,
  UserActionTypes
} from './types';

const initialState: User = {
  returningFromRedirect: false,
  isLoggedIn: false,
  token: '',
  email: ''
}

export const userReducer = (
  user: User = initialState,
  action: UserActionTypes
) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...user,
        ...action.payload,
        isLoggedIn: true
      }
    case LOG_OUT:
      return {
        ...initialState
      };
    default:
      return user;
  }
}