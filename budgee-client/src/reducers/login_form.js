import {createForms} from 'react-redux-form';

const INITIAL_STATE = {
  username: ''
};

export default createForms({
  login: INITIAL_STATE,
})