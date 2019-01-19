import { combineReducers } from 'redux';
import fetchCarsReducer from './fetch_cars_reducer';
import pendingReducer from './pending_reducer';


// Combine Reducers
const rootReducer = combineReducers({
  cars: fetchCarsReducer,
  pending: pendingReducer
});

export default rootReducer;
