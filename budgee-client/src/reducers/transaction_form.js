import {createForms} from 'react-redux-form';

const INITIAL_STATE = {
  transaction_time: '',
  transaction_date: '',
  details: '',
  description: '',
  value: '',
  tags: ''
};

export default createForms({
  transactionForm: INITIAL_STATE,
})