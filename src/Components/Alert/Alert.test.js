import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

test('renders learn react link', () => {
  const { getByText } = render(<Alert code="error" message="happening now"/>);
  const linkElement = getByText(/-/i);
  expect(linkElement).toBeInTheDocument();
});
