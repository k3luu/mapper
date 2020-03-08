import {
  CHANGE_USER,
  CHANGE_CITIES_NUMBER,
  UPDATE_CITIES_SELECTED,
  UPDATE_TRANSPORT_SELECTED
} from './actionTypes';

/* Actions for USER reducer */
export const changeUser = content => ({
  type: CHANGE_USER,
  data: content
});

export const changeUserCitiesNumber = content => ({
  type: CHANGE_CITIES_NUMBER,
  data: content
});

/* Actions for SELECTED reducer */
export const updateSelectedCities = data => ({
  type: UPDATE_CITIES_SELECTED,
  data
});

export const updateSelectedTransports = data => ({
  type: UPDATE_TRANSPORT_SELECTED,
  data
});
