import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = ingredient => {
    setIngredients(prevIngredients => [...prevIngredients, { ...ingredient, id: Math.random().toString() }]);
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
