import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import { HORIZONTAL_NAME_1, HORIZONTAL_NAME_0 } from '../helpers/constants';

describe.skip('Testing Done Page with Components', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });

  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  test('shuold render Favorite page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));

    renderWithRouter(<App />, '/favorite-recipes');
    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkButton).toBeInTheDocument();

    const horizontalImage = screen.getByTestId('0-horizontal-image');
    expect(horizontalImage).toBeInTheDocument();

    const horizontalTopText = screen.getByTestId('0-horizontal-top-text');
    expect(horizontalTopText).toBeInTheDocument();

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const favButton = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favButton).toBeInTheDocument();

    const horizontalImage1 = screen.getByTestId('1-horizontal-image');
    expect(horizontalImage1).toBeInTheDocument();

    const horizontalTopText1 = screen.getByTestId('1-horizontal-top-text');
    expect(horizontalTopText1).toBeInTheDocument();

    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const shareButton1 = screen.getByTestId('1-horizontal-share-btn');
    expect(shareButton1).toBeInTheDocument();

    const favButton1 = screen.getByTestId('1-horizontal-favorite-btn');
    expect(favButton1).toBeInTheDocument();
  });

  test('if filter button are working', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    global.localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes,
    ));

    renderWithRouter(<App />, '/favorite-recipes');

    const horizontalName = screen.getByTestId(HORIZONTAL_NAME_0);
    expect(horizontalName).toBeInTheDocument();
    const horizontalName1 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName1).toBeInTheDocument();

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealButton).toBeInTheDocument();
    userEvent.click(mealButton);

    expect(horizontalName1).not.toBeInTheDocument();
    expect(horizontalName).toBeInTheDocument();

    const allButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allButton);

    expect(horizontalName).toBeInTheDocument();
    const horizontalName2 = screen.getByTestId(HORIZONTAL_NAME_1);
    expect(horizontalName2).toBeInTheDocument();

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkButton);
  });
});
