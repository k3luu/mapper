import {
  CHANGE_USER,
  CHANGE_CITIES_NUMBER,
  CHANGE_USER_RESOURCES,
  UPDATE_CITIES_SELECTED,
  UPDATE_TRANSPORT_SELECTED_BY_CITY,
  UPDATE_TRANSPORT_SELECTED_BY_TYPE
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

export const changeUserHasResources = content => ({
  type: CHANGE_USER_RESOURCES,
  data: content
});

/* Actions for SELECTED reducer */
export const updateSelectedCities = data => ({
  type: UPDATE_CITIES_SELECTED,
  data
});

export const updateSelectedTransportsByCity = data => ({
  type: UPDATE_TRANSPORT_SELECTED_BY_CITY,
  data
});

export const updateSelectedTransportsByType = data => ({
  type: UPDATE_TRANSPORT_SELECTED_BY_TYPE,
  data
});
