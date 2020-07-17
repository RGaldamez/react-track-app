import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({email, password}) => {
    //axios request to backend
    //user signs up, change state to authorize use
    //sign up fails, show error
    try {
      const response = await trackerApi.post('/signup', {email, password});
      console.log(response.data);
    } catch (error) {
      // console.log(error.message);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with Sign up',
      });
    }
  };
};

const signin = (dispatch) => {
  return ({email, password}) => {
    //axios request to login
    //change state to authorize use
    //sign in fails, show error
  };
};

const signout = (dispatch) => {
  return () => {
    //axios request to logout
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signup, signin, signout},
  {isSignedIn: false, errorMessage: ''},
);
