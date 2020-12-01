import {UPDATE_USER} from './types';

export const login = ({username = null, password = null}) => async(dispatch: any, getState:any) => {
  const payload = {};
  dispatch({
    type: UPDATE_USER,
    payload
  });
}