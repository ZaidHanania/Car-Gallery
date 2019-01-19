import { FETCH_CARS } from '../actions';
import { SET_PENDING } from '../actions';

export default function(initialState = true, action) {
  switch(action.type) {
    case FETCH_CARS:
      return false;
    case SET_PENDING:
      return action.payload;
    default:
      return initialState;
  }
}