import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
// import Meals from '../pages/Meals';
import renderWithRouter from '../helpers/renderWithRouter';
import beefMeals from '../../cypress/mocks/beefMeals';
// import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
// import { MEALS_URL_BASE, DRINKS_URL_BASE } from '../helpers/constants';

describe('Testing Filter Page with components', () => {
  test('Filter is rendered', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const filterButton = await screen.findAllByRole('button');
    expect(filterButton[0]).toBeInTheDocument();
    expect(filterButton[1]).toHaveTextContent('Beef');
    expect(filterButton).toHaveLength(6);
  });
});
