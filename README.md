# udemy-react

## The Build Workflow

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090844

![image-20210123232502951](https://cdn.jsdelivr.net/gh/carlba/assets@master/PahAMc-image-20210123232502951.png)

## Section 3: Understanding the Base Features & Syntax

- create-react-app: https://github.com/facebookincubator/create-react-app
- Introducing JSX: https://reactjs.org/docs/introducing-jsx.html
- Rendering Elements: https://reactjs.org/docs/rendering-elements.html
- Components & Props: https://reactjs.org/docs/components-and-props.html
- Listenable Events: https://reactjs.org/docs/events.html

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

### 36. Working with Props and 37.Understanding the "children" Prop

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090870
https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090872

It is possible to send parameters to components using props, like so:

```jsx
<Person name="Johanna" age="32">
  My hobbies: Dancing
</Person>
```

```jsx
const person = props => {
  return (
    <div>
      <p>
        I'm {props.name} and I am {props.age} years old
      </p>
      <p>{props.children}</p>
    </div>
  );
};
```

The `{props.children}` attribute contains the contents of the Person element in the
parent component (The value between the start and closing tag).

### 38. Understanding & Using State

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556100

I had to convert the functional component generated by React to a class
based to do this course.

- The property state of a class based React Component is special. If it is
  changed it will trigger the DOM to be updated.

### 39. Props & State

`props` and `state` are **CORE concepts** of React. Actually, only changes in `props` and/ or `state` trigger React to re-render your components and potentially update the DOM in the browser (a detailed look at how React checks whether to really touch the real DOM is provided in section 6).

**Props**

`props` allow you to pass data from a parent (wrapping) component to a child (embedded) component.

**Example:**

**AllPosts Component:**

```jsx
const posts = () => {
  return (
    <div>
      <Post title="My first Post" />
    </div>
  );
};
```

Here, `title` is the custom property (`prop` ) set up on the custom `Post` component. We basically replicate the default HTML attribute behavior we already know (e.g. `<input type="text">` informs the browser about how to handle that input).

**Post Component:**

```jsx
const post = (props) => const post = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
}
```

The `Post` component receives the `props` argument. You can of course name this argument whatever you want - it's your function definition, React doesn't care! But React will pass one argument to your component function => An object, which contains all properties you set up on `<Post ... />` .

`{props.title}` then dynamically outputs the `title` property of the `props` object - which is available since we set the `title` property inside `AllPosts` component (see above).

**State**

Whilst props allow you to pass data down the component tree (and hence trigger an UI update), state is used to change the component, well, state from within. Changes to state also trigger an UI update.

**Example:**

**NewPost Component:**

```jsx
class NewPost extends Component {
  // state can only be accessed in class-based components!
  state = {
    counter: 1
  };

  render() {
    // Needs to be implemented in class-based components! Needs to return some JSX!
    return <div>{this.state.counter}</div>;
  }
}
```

Here, the `NewPost` component contains `state` . Only class-based components can define and use `state` . You can of course pass the `state` down to functional components, but these then can't directly edit it.

`state` simply is a property of the component class, you have to call it `state` though - the name is not optional. You can then access it via `this.state` in your class JSX code (which you return in the required `render()` method).

Whenever `state` changes (taught over the next lectures), the component will re-render and reflect the new state. The difference to `props` is, that this happens within one and the same component - you don't receive new data (`props` ) from outside!

### 40. Handling Events with Methods

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090880

```jsx
<button onClick={this.switchNameHandler}>Switch Name</button>
```

- Event handler for on click is called `onClick` in JSX as opposed to `onclick` in JS.

### 41. To Which Events Can You Listen?

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8124210

https://reactjs.org/docs/events.html#supported-events

### 42. Manipulating the State

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556154

It is possible to update the state of a component (and in turn trigger a DOM update) using the `this.setState()` method. This will merge a new state object with the old one.

### 44.Using the useState() Hook for State Manipulation (Functional Component)

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556164

- Functional components uses useState to manage state. It can be imported from `react`
  and returns an array of `[currentState, stateModifierFunction]`. It is good practice to
  have partial states for separate things. When using one state it is up to the operator
  to merge the state on update.

### 45. Stateless vs Stateful Components

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556166

- You should avoid stateful components if it is not absolutely necessary

### 46. Passing Method References Between Components

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090888

- It is perfectly fine in React to pass methods such as click handler functions as props
  to other components.

- Arguments can be passed to a method when using is as an event handler in two ways

  The more preformat way:

  ```jsx
  <Person
    name={this.state.persons[1].name}
    age={this.state.persons[1].age}
    click={this.switchNameHandler.bind(this, 'Charles')}
  >
  ```

  The simpler way

  ```jsx
  <button onClick={() => this.switchNameHandler('Carlos')}>Switch Name</button>
  ```

  The more preformat way

### 47. Adding Two Way Binding

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090892

To both reflect the content in an input box in a div and also show the content of that
div in the input box Two Way Binding is needed.

```jsx
<input type="text" onChange={props.changed} value={props.name} />
```

<iframe height=600 src="https://stackblitz.com/edit/carlba-react-two-way-binding?embed=1&file=src/App.js"></iframe>

### 48. Adding Styling with Stylesheets

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8090894

## Section 4: Working with Lists and Conditionals

- Conditional Rendering: https://reactjs.org/docs/conditional-rendering.html
- Lists & Keys: https://reactjs.org/docs/lists-and-keys.html

### 53. Rendering Content Conditionally

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8091064

<iframe height=400 src="https://stackblitz.com/edit/carlba-react-render-conditionally?embed=1&file=src/App.js&hideExplorer=1"></iframe>

- JSX can also contain Javascript code simpler statements such as ternaries can be used when enclosed in `{}`.

### 54. Handling Dynamic Content "The JavaScript Way"

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8091068

<iframe height=500 src="https://stackblitz.com/edit/carlba-react-render-conditionally-javascript?embed=1&file=src/App.js"></iframe

### 56. Outputting Lists

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8091072

<iframe height=500 src="https://stackblitz.com/edit/carlba-react-rendering-list?embed=1&file=src/App.js"></iframe>

### 57. Lists & State

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8111600

### 58. Updating State Immutably

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8091074

- Never mutate the state directly always make sure you are making a copy or using a function that already copies the state property.

### 59. Lists & Keys

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8091076

- Always add a key attribute to you React component to allow react to optimize using it's virtual dom.

### 60. Flexible Lists

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8091078

## Section 5: Styling React Components & Elements

### 65. Outlining the Problem Set

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094578

* Inline styling has the drawback that pseudo selections can't be used.
* Using a specific CSS file has the drawback that the styles are global.

### 67. Setting Class Names Dynamically

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094580

### 68. Adding and Using Radium

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094586

Radium is a popular package that allows us to use inline styles with psedo selectors.

```bash
npm install --save radium
```

<iframe height=500 src="https://stackblitz.com/edit/carlba-js-react-radium?embed=1&file=src/App.js&hideExplorer=1"></iframe>



### 69. Using Radium for Media Queries

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094590#questions/13791350



### 70. Introducing Styled Components

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/16851070

Another popular way for styling components is the [Styled Components](https://styled-components.com/) library.

* Install it `npm install --save styled-components`

<iframe height=500 src="https://stackblitz.com/edit/carlba-js-react-styled-components?embed=1&file=src/App.js&hideExplorer=1"></iframe>



