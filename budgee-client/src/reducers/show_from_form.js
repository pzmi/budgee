import {createForms} from 'react-redux-form';

const INITIAL_STATE = {
  date: new Date(),
};

export default createForms({
  showFrom: INITIAL_STATE,
})