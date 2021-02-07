import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

export function convertObjectToArray(obj) {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return [...acc, { ...value, id: key }];
  }, []);
}

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleFilterChange = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const handleAddIngredient = async ingredient => {
    setIsLoading(true);
    let json;
    try {
      const response = await fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      });
      json = await response.json();
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    if (json) {
      setIsLoading(false);
      setIngredients(prevIngredients => [...prevIngredients, { ...ingredient, id: json.name }]);
    }
  };

  const handleRemoveIngredient = async ingredientId => {
    setIsLoading(true);
    try {
      await fetch(`https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
        method: 'DELETE'
      });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
    setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
  };

  const handleErrorModalOnClose = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error ? <ErrorModal onClose={handleErrorModalOnClose}>{error}</ErrorModal> : null}
      <IngredientForm onAddIngredient={handleAddIngredient} isLoading={isLoading} />

      <section>
        <Search onFilterChange={handleFilterChange} />
        <IngredientList ingredients={ingredients} onRemoveItem={ingredientId => handleRemoveIngredient(ingredientId)} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
