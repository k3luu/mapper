import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CityList from '../components/CityList';
import store from '../redux/store';

describe('<CityList/>', () => {
  test('shows the city select label', () => {
    const testMessage =
      'Select the cities where you would like to have your interviews.';

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('shows one of the cities Ben can attend', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const cityElement = getByText(/San Francisco/i);

    fireEvent.click(cityElement);

    expect(cityElement).toBeInTheDocument();
  });
});
