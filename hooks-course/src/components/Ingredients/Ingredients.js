import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

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
