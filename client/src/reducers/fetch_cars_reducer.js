import { FETCH_CARS } from '../actions';

export default function(initalState = [], action) {

  switch(action.type) {
    case FETCH_CARS:
      return action.payload;
    default:
      return initalState;
  }
}