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

## Debugging

* Using Chromium as the default browser for the `npm start` command is simple. Just add   `BROWSER=chromium` before the start script in `package.json`, like so:

  ```json
    "scripts": {
      "start": "BROWSER=chromium react-scripts start",    
    },
  ```

  

