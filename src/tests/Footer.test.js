import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { TEST_ID_FOOTER_MEALS, TEST_ID_FOOTER_DRINKS } from '../helpers/constants';

describe('Testing Footer Page with components', () => {
  test('Footer is rendered', () => {
    renderWithRouter(<App />, '/meals');
    const mealsFooter = screen.getByTestId(TEST_ID_FOOTER_MEALS);
    const drinkFooter = screen.getByTestId(TEST_ID_FOOTER_DRINKS);

    expect(mealsFooter).toBeInTheDocument();
    expect(drinkFooter).toBeInTheDocument();
  });
});
