# udemy-react

## The Build Workflow

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090844

![image-20210123232502951](https://cdn.jsdelivr.net/gh/carlba/assets@master/PahAMc-image-20210123232502951.png)

## Section 3: Understanding the Base Features & Syntax

### Create React App

Is a [tool](https://github.com/facebook/create-react-app) to create a react project it is
maintained by a community run by facebook.

1. Install using npm `npm install -h create-react-app`

### Basic Project Structure

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090850

### 29. Understanding Component Basics

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090852

### 30. Understanding JSX

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090856

The initial return statement is in JSX which is a templating language for generation HTML.

```jsx
function App() {
  return (
    <div className="App">
      <h1>Hi I'm a React App</h1>
    </div>
  );

  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'))
}
```

In the second return statement we can see what React does with this under the hood.

### 31. JSX Restrictions

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090858

```jsx
function App() {
  return (
    <div className="App">
      <h1>Hi I'm a React App</h1>
    </div>
  );
}
```

- `className` is used instead of the HTML class attribute. Since class is a reserved name.
- It is best practice to wrap one component into one element.

### 32. Creating a Functional Component

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090862

- Components and folders they exists in are written with first capital letter so `Person` not `person`.

- `import React from 'react';` needs to exists in a component script since the JSX gets compiled into React.createElement calls.

### 32. Components & JSX Cheat Sheet

**JSX is NOT HTML** but it looks a lot like it. Differences can be seen when looking closely though (for example className in JSX vs class in "normal HTML"). JSX is just syntactic sugar for JavaScript, allowing you to write HTMLish code instead of nested React.createElement(...) calls.

When creating components, you have the choice between **two different ways:**

1. **Functional components** (also referred to as "presentational", "dumb" or "stateless" components - more about this later in the course) => `const cmp = () => { return <div>some JSX</div> }` (using ES6 arrow functions as shown here is recommended but optional)
2. **class-based components** (also referred to as "containers", "smart" or "stateful" components) => `class Cmp extends Component { render () { return <div>some JSX</div> } }`

We'll of course dive into the difference throughout this course, you can already note that you should use 1) as often as possible though. It's the best-practice.

### 34. Working with Components & Re-Using Them

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090864

### 35. Outputting Dynamic Content

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090868

- Dynamic content in JSX templates are written between single curly braces. Any one line javascript expression can be written within the braces.

  `{Math.floor(Math.random() * 30 )}` Would for instance output a random number

### 36. Working with Props

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090870

It is possible to send parameters to components using props, like so:

```jsx
<Person name="Carl" age="37" />
```

```jsx
const person = props => {
  return (
    <p>
      I'm {props.name} and I am {props.age} years old
    </p>
  );
};
```
