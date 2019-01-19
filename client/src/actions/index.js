import axios from 'axios';

export const FETCH_CARS = 'FETCH_CARS';
export const SET_PENDING = 'SET_PENDING';

const fetchCars = () => {

  // Construct request URL and use axios to return promise
  const request = axios.get('/cars');

  // Use thunk to dispatch action when promise resolves
  return (dispatch) => {
    return request.then(
      result => dispatch({
        type: FETCH_CARS,
        payload: result.data // Payload contains array of image urls
      }));
  };
}

const setPending = (bool) => {
  return {
    type: SET_PENDING,
    payload: bool
  }
}

export { fetchCars, setPending }