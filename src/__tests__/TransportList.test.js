import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import TransportList from '../components/TransportList';
import Transport from '../data/Transport';
import store from '../redux/store';
import {
  UPDATE_CITIES_SELECTED,
  UPDATE_TRANSPORT_SELECTED_BY_CITY,
  UPDATE_TRANSPORT_SELECTED_BY_TYPE
} from '../redux/actionTypes';

const testCity = { id: 2020, name: 'San Jose', distance: 300 };

describe('<TransportList />', () => {
  test('displays the correct transport option labels', () => {
    render(
      <Provider store={store}>
        <TransportList city={{ id: 2020, name: 'San Jose', distance: 300 }} />
      </Provider>
    );

    Transport.map(mode => {
      expect(screen.getByText(mode.type)).toBeInTheDocument();
    });
  });

  test('checks that radio buttons have the correct value', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <TransportList city={{ id: 2020, name: 'San Jose', distance: 300 }} />
      </Provider>
    );

    let transportElement;

    Transport.map(mode => {
      transportElement = getByTestId(`${mode.type}-test`);
      expect(transportElement.value).toBe(mode.type);
    });
  });

  test('checks that selecting a transport returns the correct time to destination', () => {
    const initialState = {
      cities: new Map(),
      transportByCityName: new Map(),
      transportByType: new Map()
    };

    initialState.cities.set('San Jose', testCity);

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

    const testStore = createStore(combineReducers({ selected }));

    const testBeforeMessage = 'Time to destination: _ hours';
    const testAfterMessage = 'Time to destination: 3 hours';

    const { getByTestId } = render(
      <Provider store={testStore}>
        <TransportList city={testCity} />
      </Provider>
    );

    expect(screen.getByText(testBeforeMessage)).toBeInTheDocument();

    const transportElement = getByTestId('Bus-test');

    fireEvent.click(transportElement);

    expect(screen.getByText(testAfterMessage)).toBeInTheDocument();
  });
});
