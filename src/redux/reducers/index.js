import { combineReducers } from 'redux';
import user from './user';
import selected from './selected';

export default combineReducers({ user, selected });
