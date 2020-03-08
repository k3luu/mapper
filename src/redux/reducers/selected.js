import {
  UPDATE_CITIES_SELECTED,
  UPDATE_TRANSPORT_SELECTED
} from '../actionTypes';

const initialState = {
  cities: new Map(),
  transport: new Map()
};

const selected = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CITIES_SELECTED:
      return { ...state, cities: action.data };

    case UPDATE_TRANSPORT_SELECTED:
      return { ...state, transport: action.data };

    default:
      return state;
  }
};

export default selected;
