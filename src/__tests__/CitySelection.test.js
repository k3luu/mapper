import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CitySelection from '../components/CitySelection';
import store from '../redux/store';

describe('<CitySelection />', () => {
  test('displays the correct distance for the city', () => {
    const testMessage = 'Distance: 300 miles';

    render(
      <Provider store={store}>
        <CitySelection city={{ id: 2020, name: 'San Jose', distance: 300 }} />
      </Provider>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('checks that selecting a city toggles the value', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CitySelection city={{ id: 2020, name: 'San Jose', distance: 300 }} />
      </Provider>
    );

    const cityElement = getByTestId('2020');

    expect(cityElement.checked).toBe(false);

    fireEvent.click(cityElement);

    expect(cityElement.checked).toBe(true);

    fireEvent.click(cityElement);

    expect(cityElement.checked).toBe(false);
  });

  test('checks that selecting a city opens the transport panel', () => {
    const testMessage = 'How would you like to get there?';

    const { getByTestId } = render(
      <Provider store={store}>
        <CitySelection city={{ id: 2020, name: 'San Jose', distance: 300 }} />
      </Provider>
    );

    const cityElement = getByTestId('2020');

    fireEvent.click(cityElement);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
