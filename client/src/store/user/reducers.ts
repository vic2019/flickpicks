import {
  LOG_IN,
  LOG_OUT,
  User,
  UserActionTypes
} from './types';

const initialState: User = {
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
      }
    case LOG_OUT:
      return {
        ...initialState
      };
    default:
      return user;
  }
}