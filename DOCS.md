# React

## Styling

### CSS Modules

Using CSS Modules in later React versions is super simple.

* Create a CSS file named ComponentName.module.css

* Import styles from it using this syntax `import styles from './App.module.css';`

* You can then use the Component specific classes, like so:

  ```jsx
  <div className={styles.red}></div>
  ```

* In reality the class class will be added with a unique identifier at the end. Which is how the component specificness is achieved.


<iframe height=600 src="https://stackblitz.com/edit/carlba-js-react-css-modules?embed=1&file=src/App.js"></iframe>

## Structure

```bash
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── assets
│   ├── components
│   ├── containers
│   ├── index.css
│   ├── index.js
│   └── setupTests.js
└── yarn.lock
```

* `src/components` Presentational Components
* `src/containers` Stateful Components

## Components

### General

The content passed into a Component can be accessed through the `props.children` property, like so:

```jsx
const Component = (props) => (
  <div>{props.children}</div>  
)

const App = (props) => (
	<Component>Test</Component>
)
```

### Class Based

It is not possible to use the true function body approach for event handler in class based components.

```jsx
  purchaseHandler() {
    this.setState({ isOrdering: true });
  };
```

The `this` keyword will not be availible where the event handler is used. Therefore stick to arrow functions for methods in React.

```jsx
  purchaseHandler = () => {
    this.setState({ isOrdering: true });
  };
```



### Validation

Validation can be done by using the `prop-types ` NPM package.

```jsx
npm install --save prop-types
```

The props of a component can then be validated, like so:

```jsx
const Component = () => (
	<div>My Component</div>
)

Component.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default Component;
```

* isRequired can be chained to a type to indicate that the prop is mandatory

### Toggling Elements

* Toggling elements in React can be done by maintaining a state representing the button and binding the standard HTML property `disabled` to it.

<iframe height=500px src="https://stackblitz.com/edit/carlba-js-react-template-disable-button?embed=1&file=src/App.js"></iframe>

### Higher Order Components

* Adjacent DOM elements can be rendered in a React component by wrapping them in the `React.Fragment` HOC provided by React, like so:

  ```jsx
  <React.Fragment>
  	<div>Div 1</div>
    <div>Div 2</div>
  </React.Fragment>
  ```

## Debugging

* Using Chromium as the default browser for the `npm start` command is simple. Just add   `BROWSER=chromium` before the start script in `package.json`, like so:

  ```json
    "scripts": {
      "start": "BROWSER=chromium react-scripts start",    
    },
  ```

  

## Code Style

Code style is a matter of personal preference but I think it makes sense to adhere to best practises of the libs and frameworks you are using.

### Event Handler Naming

* Events emitted from a component adheres to how it works in HTML elements. `onclick`, `onchange` and so on. If the user is cancelling the component the outbound prop would be `onCancel`
* Methods or functions that actually handles emitted events should be prefixed with `handle` so `handleCancel()`

Inspired by [EVENT HANDLER NAMING IN REACT](https://jaketrent.com/post/naming-event-handlers-react) and enforced by these [eslint rules](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)

