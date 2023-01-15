import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Header from '../components/Header/Header';
import { getFromLocalStorage } from '../helpers/localStorage';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const history = useHistory();

  useEffect(() => {
    const doneRecipesFromLocalStorage = getFromLocalStorage('doneRecipes') || [];
    setDoneRecipes(doneRecipesFromLocalStorage);
  }, []);

  const filterdoneRecipes = doneRecipes
    .filter(({ type }) => filter === 'all' || type === filter);
  console.log(filterdoneRecipes);

  return (
    <div>
      <Header />
      <div className="done-filter-container mb-5 mt-3">
        <ButtonGroup>
          <Button
            variant="secondary"
            value="all"
            onClick={ ({ target }) => setFilter(target.value) }
            data-testid="filter-by-all-btn"
          >
            All
          </Button>
          <Button
            variant="secondary"
            value="meal"
            onClick={ ({ target }) => setFilter(target.value) }
            data-testid="filter-by-meal-btn"
          >
            Meals
          </Button>
          <Button
            variant="secondary"
            value="drink"
            onClick={ ({ target }) => setFilter(target.value) }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
        </ButtonGroup>
      </div>
      <div className="done-card-container">
        {filterdoneRecipes.map((
          {
            image,
            category,
            name,
            doneDate,
            nationality,
            alcoholicOrNot,
            tags,
            type,
            id,
          },
          index,
        ) => (
          <div key={ `${index}` }>
            <Card style={ { width: '26rem' } }>
              <div className="done-card">
                <Card.Img
                  variant="top"
                  src={ image }
                  onClick={ () => history.push(`/${type}s/${id}`) }
                />
                <Card.Body>
                  <Card.Title className="mt-4 text-muted">{ name }</Card.Title>
                  <Badge bg="secondary" style={ { margin: '5px' } }>
                    { type === 'meal'
                      ? `${nationality} - ${category}`
                      : alcoholicOrNot }
                  </Badge>
                  <Badge bg="secondary" style={ { margin: '5px' } }>
                    { doneDate }
                  </Badge>
                  { tags?.filter((_, ind) => ind < 2).map((val, ind) => (
                    <Badge
                      bg="secondary"
                      style={ { margin: '5px' } }
                      key={ ind }
                      data-testid={ `${index}-${val}-horizontal-tag` }
                    >
                      { val }
                    </Badge>
                  ))}
                </Card.Body>
              </div>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DoneRecipes;
