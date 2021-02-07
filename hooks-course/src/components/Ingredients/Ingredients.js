import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingrediens.json')
      .then(response => response.json())
      .then(json => convertObjectToArray(json))
      .then(dataArray => setIngredients(dataArray));
  }, []);

  const handleAddIngredient = async ingredient => {
    const response = await fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingrediens.json', {
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
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
