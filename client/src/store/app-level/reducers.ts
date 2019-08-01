import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
  HIDE_ERROR,
  AppLevel,
  AppLevelActionTypes
} from './types'

const initialState: AppLevel = {
  waiting: false,
  error: false,
  errorMsg: 'Error. Please try again later.'
}

export const appLevelReducer = (
  appLevel: AppLevel = initialState,
  action: AppLevelActionTypes
) => {
  switch (action.type) {
    case SHOW_WAITING:
      return {
        ...appLevel,
        waiting: true
      };
    case HIDE_WAITING:
      return {
        ...appLevel,
        waiting: false
      };
    case SHOW_ERROR:
      return {
        ...appLevel,
        error: true,
        errorMsg: action.msg? action.msg: 'Error. Please try again later.'
      };
    case HIDE_ERROR:
      return {
        ...appLevel,
        error: false
      };
    default:
      return appLevel;
  }
};
