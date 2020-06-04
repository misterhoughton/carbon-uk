import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the title element', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Carbon Intensity Data UK/i);
  expect(title).toBeInTheDocument();
});
