import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Greeting from '../components/Greeting';
import store from '../redux/store';

describe('<Greeting/>', () => {
  test('loads correct user name', () => {
    const testUser = 'Hi Ben!';

    render(
      <Provider store={store}>
        <Greeting />
      </Provider>
    );

    expect(screen.getByText(testUser)).toBeInTheDocument();
  });

  test('loads correct number of cities', () => {
    const testCities = 'You have 4 cities to select for your interviews.';

    render(
      <Provider store={store}>
        <Greeting />
      </Provider>
    );

    expect(screen.getByText(testCities)).toBeInTheDocument();
  });

  test('loads correct number of selected cities to compare with max cities', () => {
    const testCities = '0 / 4 Cities selected';

    render(
      <Provider store={store}>
        <Greeting />
      </Provider>
    );

    expect(screen.getByText(testCities)).toBeInTheDocument();
  });
});
