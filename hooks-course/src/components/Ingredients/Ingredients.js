import React, { useEffect, useState, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.ingredients;
    case 'CREATE':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error(`Should not happen ${action.type}`);
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { isLoading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, isLoading: false };
    case 'ERROR':
      return { isLoading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Should not happen');
  }
};

export function convertObjectToArray(obj) {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return [...acc, { ...value, id: key }];
  }, []);
}

function Ingredients() {
  const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { isLoading: false, error: null });

  const handleFilterChange = useCallback(filteredIngredients => {
    dispatchIngredients({ type: 'UPDATE', ingredients: filteredIngredients });
  }, []);

  const handleAddIngredient = async ingredient => {
    dispatchHttp({ type: 'SEND' });
    let json;
    try {
      const response = await fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      });
      json = await response.json();
      dispatchHttp({ type: 'RESPONSE' });
    } catch (error) {
      dispatchHttp({ type: 'ERROR', errorMessage: error.message });
    }
    if (json) {
      dispatchIngredients({ type: 'CREATE', ingredient: { ...ingredient, id: json.name } });
    }
  };

  const handleRemoveIngredient = async ingredientId => {
    dispatchHttp({ type: 'SEND' });
    try {
      await fetch(`https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
        method: 'DELETE'
      });
      dispatchHttp({ type: 'RESPONSE' });
    } catch (error) {
      dispatchHttp({ type: 'ERROR', errorMessage: error.message });
    }
    dispatchIngredients({ type: 'DELETE', id: ingredientId });
  };

  const handleErrorModalOnClose = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {httpState.error ? <ErrorModal onClose={handleErrorModalOnClose}>{httpState.error}</ErrorModal> : null}
      <IngredientForm onAddIngredient={handleAddIngredient} isLoading={httpState.isLoading} />

      <section>
        <Search onFilterChange={handleFilterChange} />
        <IngredientList ingredients={ingredients} onRemoveItem={ingredientId => handleRemoveIngredient(ingredientId)} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
