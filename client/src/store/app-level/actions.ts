import { ThunkAction } from 'redux-thunk';

import {
  SHOW_ERROR,
  HIDE_ERROR,
  AppLevelActionTypes
} from './types'

export const showError = (
  msg: string | undefined | null
): ThunkAction<void, any, null, AppLevelActionTypes> => (
    dispatch
) => {
  dispatch({
    type: SHOW_ERROR,
    msg: msg? msg: ''
  });
};

export const hideError = (): 
ThunkAction<void, any, null, AppLevelActionTypes> => (dispatch) => {
  dispatch({
    type: HIDE_ERROR
  });
};
