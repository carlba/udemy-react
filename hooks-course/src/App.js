import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context//auth-context';
import IngredientList from './components/Ingredients/IngredientList';

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;

  if (authContext.isAuthenticated) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
