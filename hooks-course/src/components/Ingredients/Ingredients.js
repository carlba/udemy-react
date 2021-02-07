import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

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

  const handleFilterChange = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const handleAddIngredient = async ingredient => {
    const response = await fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    setIngredients(prevIngredients => [...prevIngredients, { ...ingredient, id: json.name }]);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={handleAddIngredient} />

      <section>
        <Search onFilterChange={handleFilterChange} />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
