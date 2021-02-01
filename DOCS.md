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

  

