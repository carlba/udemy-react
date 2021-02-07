## Section 26: React Hooks

![image-20210207140002429](https://cdn.jsdelivr.net/gh/carlba/assets@master/Sfwx5f-image-20210207140002429.png)

### 427. The Starting Project

https://kutt.it/FdFS2h

### 428. Getting Started with useState()

### 431. Multiple States

https://kutt.it/xIk16w

### 432. Rules of Hooks

https://kutt.it/qJMIYK

![image-20210207152028862](https://cdn.jsdelivr.net/gh/carlba/assets@master/rW4k4P-image-20210207152028862.png)

* You must only use hooks in functional component on the root level.

### 433. Passing State Data Across Components

https://kutt.it/tD98WC

### 434. Sending Http Requests

https://kutt.it/A99AGg

Convoluted way to send http request with fetch

```jsx 
const handleAddIngredient = async ingredient => {
  const response = await fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingrediens.json', {
    method: 'POST',
    body: JSON.stringify(ingredient),
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  setIngredients(prevIngredients => [...prevIngredients, { ...ingredient, id: json.name }]);
};
```

### 435. useEffect() & Loading Data

https://kutt.it/iCdSpO

* `useEffect()` get's executed after each render cycle
* The second argument controls on which state changes the effect will run `[]` means only on mount.

```jsx
  useEffect(() => {
    fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingrediens.json')
      .then(response => response.json())
      .then(json => convertObjectToArray(json))
      .then(dataArray => setIngredients(dataArray));
  }, []);
```

