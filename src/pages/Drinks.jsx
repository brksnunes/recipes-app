import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Drinks({
  strDrink,
  strDrinkThumb,
  dataTestIdCard,
  dataTestIdImg,
  dataTestIdName,
  idDrink,
}) {
  const history = useHistory();

  const detailsDrinkRedirectHandler = async () => {
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <section
      data-testid={ dataTestIdCard }
      role="presentation"
      onClick={ detailsDrinkRedirectHandler }
      id={ idDrink }
    >
      <p data-testid={ dataTestIdName }>
        {strDrink}
      </p>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ dataTestIdImg }
      />
    </section>
  );
}

Drinks.defaultProps = {
  strDrink: '',
  strDrinkThumb: '',
  dataTestIdCard: '',
  dataTestIdImg: '',
  dataTestIdName: '',
  idDrink: '',
};

Drinks.propTypes = {
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  dataTestIdCard: PropTypes.string,
  dataTestIdImg: PropTypes.string,
  dataTestIdName: PropTypes.string,
  idDrink: PropTypes.string,

};

export default Drinks;
