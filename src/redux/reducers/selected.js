import {
  UPDATE_CITIES_SELECTED,
  UPDATE_TRANSPORT_SELECTED_BY_CITY,
  UPDATE_TRANSPORT_SELECTED_BY_TYPE
} from '../actionTypes';

const initialState = {
  cities: new Map(),
  transportByCityName: new Map(),
  transportByType: new Map()
};

const selected = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CITIES_SELECTED:
      return { ...state, cities: action.data };

    case UPDATE_TRANSPORT_SELECTED_BY_CITY:
      return { ...state, transportByCityName: action.data };

    case UPDATE_TRANSPORT_SELECTED_BY_TYPE:
      return { ...state, transportByType: action.data };

    default:
      return state;
  }
};

export default selected;
