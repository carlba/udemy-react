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
