import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';

describe('<App/>', () => {
  test('renders header', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const headerElement = getByText(/Map Your Route/i);
    expect(headerElement).toBeInTheDocument();
  });
});
