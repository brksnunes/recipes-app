import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import baseMeals from '../../cypress/mocks/meals';
import baseDrinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import { CHICKEN_CATEGORY_FILTER } from '../helpers/constants';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testing Filter Page with components', () => {
  test('Components Meals exist in page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(baseMeals),
    });

    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const imgMeal = await screen.findByTestId('0-card-img');
    expect(imgMeal).toBeInTheDocument();
    const chickenFilter = await screen.findByTestId(CHICKEN_CATEGORY_FILTER);
    expect(chickenFilter).toBeInTheDocument();
  });
});
