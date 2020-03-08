import { CHANGE_USER, CHANGE_CITIES_NUMBER } from '../actionTypes';

const initialState = {
  name: 'Ben',
  num_cities: 4
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, name: action.data };

    case CHANGE_CITIES_NUMBER:
      return { ...state, num_cities: action.data };

    default:
      return state;
  }
};

export default user;
