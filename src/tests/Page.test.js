import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
// import Meals from '../pages/Meals';
import renderWithRouter from '../helpers/renderWithRouter';
import beefMeals from '../../cypress/mocks/beefMeals';
// import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import mealCategories from '../../cypress/mocks/mealCategories';
// import { TEST_ID_FOOTER_DRINKS, TEST_ID_FOOTER_MEALS } from '../helpers/constants';

describe('Testing Filter Page with components', () => {
  test('Components exist in page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategories),

    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(beefMeals),
    });

    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const filterButton = await screen.findAllByRole('button');
    expect(filterButton).toHaveLength(6);

    const imgMeal = await screen.findByTestId('0-card-img');
    expect(imgMeal).toBeInTheDocument();
  });

  // test('page is changed to Drinks', async () => {
  //   const { history } = renderWithRouter(<App />, '/meals');
  //   let { location: { pathname } } = history;
  //   expect(pathname).toEqual('/meals');

  //   const mealsFooter = await screen.findByTestId(TEST_ID_FOOTER_MEALS);
  //   const drinkFooter = await screen.findByTestId(TEST_ID_FOOTER_DRINKS);

  //   expect(mealsFooter).toBeInTheDocument();
  //   expect(drinkFooter).toBeInTheDocument();

  //   userEvent.click(drinkFooter);

  //   global.fetch.mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValueOnce(cocktailDrinks),
  //   });

  //   pathname = await history.location.pathname;
  //   expect(pathname).toEqual('/');
  // });
});
