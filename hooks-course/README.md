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

### 436. Understanding useEffect() Dependencies and useCallback()

```jsx
  const handleFilterChange = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);
```

* The useCallback allows a function to not be recreated on re rendering

### 439. Working with Refs & useRef()

https://kutt.it/A9dLV8

```jsx
  const { onFilterChange } = props;
  const [filter, setFilter] = useState('');
  const inputRef = useRef();  
	
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
        fetch('https://udemy-react-hooks-course-default-rtdb.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(json => convertObjectToArray(json))
          .then(dataArray => onFilterChange(dataArray));
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, onFilterChange, inputRef]);
```

* The value in filter is frozen when the timer is initialised.

* To get the current value of the input we use `useRef()`  and hook it up to the input element

  ```jsx
  <input ref={inputRef} type="text" value={filter} onChange={event => setFilter(event.target.value)} />
  ```

* We can then compare previous value and current value of input.

* The returned function in the cleanup function that gets executed after the effect.

* 

### 441. Deleting Ingredients

https://kutt.it/SbedDZ

### 442. Loading Errors & State Batching

https://kutt.it/19rbH1

![image-20210207171850107](https://cdn.jsdelivr.net/gh/carlba/assets@master/GigKTE-image-20210207171850107.png)

React batches state updates - see: https://github.com/facebook/react/issues/10231#issuecomment-316644950

That simply means that calling

```
setName('Max');setAge(30);
```

in the same synchronous (!) execution cycle (e.g. in the same function) will **NOT trigger two component re-render cycles**.

Instead, the component will **only re-render once** and both state updates will be **applied simultaneously**.

Not directly related, but also sometimes misunderstood, is when the new state value is available.

Consider this code:

```
console.log(name); // prints name state, e.g. 'Manu'setName('Max');console.log(name); // ??? what gets printed? 'Max'?
```

You could think that accessing the name state after `setName('Max');` should yield the new value (e.g. `'Max'`) but this is **NOT the case**. Keep in mind, that the **new state value is only available in the next component render cycle** (which gets scheduled by calling `setName()`).

**Both concepts (batching and when new state is available) behave in the same way for both functional components with hooks as well as class-based components with** `**this.setState()**`**!**

### 444. Understanding useReducer()

https://kutt.it/qciFLX

### 445. Using useReducer() for the Http State

https://kutt.it/Rmj6Nx