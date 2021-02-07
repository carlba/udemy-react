import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

export function convertObjectToArray(obj) {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return [...acc, { ...value, id: key }];
  }, []);
}

const Search = React.memo(props => {
  const { onFilterChange } = props;

  const [filter, setFilter] = useState('');
  useEffect(() => {
    const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
    fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients.json' + query)
      .then(response => response.json())
      .then(json => convertObjectToArray(json))
      .then(dataArray => onFilterChange(dataArray));
  }, [filter, onFilterChange]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filter} onChange={event => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
