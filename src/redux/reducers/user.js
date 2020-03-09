import {
  CHANGE_USER,
  CHANGE_CITIES_NUMBER,
  CHANGE_USER_RESOURCES
} from '../actionTypes';

const initialState = {
  name: 'Ben',
  num_cities: 4,
  has_enough_resources: true
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, name: action.data };

    case CHANGE_CITIES_NUMBER:
      return { ...state, num_cities: action.data };

    case CHANGE_USER_RESOURCES:
      return { ...state, has_enough_resources: action.data };

    default:
      return state;
  }
};

export default user;
