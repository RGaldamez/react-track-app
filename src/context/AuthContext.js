import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signup':
      return {token: action.payload, errorMessage: ''};
    case 'signin':
      return {token: action.payload, errorMessage: ''};
    case 'signout':
      return {token: '', errorMessage: ''};
    case 'clear_error_message':
      return {...state, errorMessage: ''};

    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    navigate('TrackList');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = (dispatch) => async ({email, password}) => {
  //axios request to backend
  //user signs up, change state to authorize use
  //sign up fails, show error
  try {
    const response = await trackerApi.post('/signup', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signup', payload: response.data.token});
    navigate('TrackList');
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with Sign up',
    });
  }
};

const signin = (dispatch) => async ({email, password}) => {
  //axios request to login
  //change state to authorize use
  //sign in fails, show error
  try {
    const response = await trackerApi.post('/signin', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something when wrong with sign in',
    });
  }
};

const signout = (dispatch) => async () => {
  //axios request to logout
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('loginFlow');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signup, signin, signout, clearErrorMessage, tryLocalSignin},
  {token: null, errorMessage: ''},
);
