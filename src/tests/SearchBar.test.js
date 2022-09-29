import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import {
  TEST_ID_HEADER_SEARCH,
  TEST_ID_SEARCHBAR_INPUT,
  TEST_ID_SEARCHBAR_BTN,
  TEST_ID_SEARCHBAR_FL_FILTER,
  TEST_ID_SEARCHBAR_NAME_FILTER,
  TEST_ID_SEARCHBAR_ING_FILTER,
} from '../helpers/constants';

describe('Tests for the SearchBar component', () => {
  test('If the searchbar is rendered correctly', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');

    const searchBtn = screen.getByTestId(TEST_ID_HEADER_SEARCH);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(TEST_ID_SEARCHBAR_INPUT);
    expect(searchInput).toBeInTheDocument();
  });
  test('If the searchbar has all the inputs', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const { location: { pathname } } = history;
    expect(pathname).toEqual('/meals');
    const searchBtn = screen.getByTestId(TEST_ID_HEADER_SEARCH);
    userEvent.click(searchBtn);

    const searchBarIngredientFilter = screen.getByTestId(TEST_ID_SEARCHBAR_ING_FILTER);
    expect(searchBarIngredientFilter).toBeInTheDocument();

    const searchBarNameFilter = screen.getByTestId(TEST_ID_SEARCHBAR_NAME_FILTER);
    expect(searchBarNameFilter).toBeInTheDocument();

    const searchBarFirstLetterFilter = screen.getByTestId(TEST_ID_SEARCHBAR_FL_FILTER);
    expect(searchBarFirstLetterFilter).toBeInTheDocument();

    const searchBarButton = screen.getByTestId(TEST_ID_SEARCHBAR_BTN);
    expect(searchBarButton).toBeInTheDocument();
  });
  test('If it uses the correct url for the ingredients fetch', () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(TEST_ID_HEADER_SEARCH);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(TEST_ID_SEARCHBAR_INPUT);
    const searchBarIngredientFilter = screen.getByTestId(TEST_ID_SEARCHBAR_ING_FILTER);
    const searchBarButton = screen.getByTestId(TEST_ID_SEARCHBAR_BTN);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(searchBarIngredientFilter);
    userEvent.click(searchBarButton);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
  test('If it uses the correct url for the name fetch', () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(TEST_ID_HEADER_SEARCH);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(TEST_ID_SEARCHBAR_INPUT);
    const searchBarNameFilter = screen.getByTestId(TEST_ID_SEARCHBAR_NAME_FILTER);
    const searchBarButton = screen.getByTestId(TEST_ID_SEARCHBAR_BTN);

    userEvent.type(searchInput, 'soup');
    userEvent.click(searchBarNameFilter);
    userEvent.click(searchBarButton);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });
  test('If it uses the correct url for the first letter fetch', () => {
    jest.spyOn(global, 'fetch');

    renderWithRouter(<App />, '/meals');

    const searchBtn = screen.getByTestId(TEST_ID_HEADER_SEARCH);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(TEST_ID_SEARCHBAR_INPUT);
    const searchBarFirstLetterFilter = screen.getByTestId(TEST_ID_SEARCHBAR_FL_FILTER);
    const searchBarButton = screen.getByTestId(TEST_ID_SEARCHBAR_BTN);

    userEvent.type(searchInput, 'a');
    userEvent.click(searchBarFirstLetterFilter);
    userEvent.click(searchBarButton);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
});
