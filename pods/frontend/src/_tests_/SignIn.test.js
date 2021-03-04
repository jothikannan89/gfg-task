import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignIn from '../components/singnIn';

describe('check login component', () => {
it('check if form displays', () => {
    const { getByTestId } = render(<SignIn />);
    const email = getByTestId('email');
    const submit = getByTestId('submit');
  
    expect(email).toBeInTheDocument('');
    expect(submit).toBeInTheDocument();
  });
});