import { combineReducers } from 'redux';

import books from './reducers/books';
import user from './reducers/user';

export default combineReducers({
  books,
  user
})