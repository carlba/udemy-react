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

- Inline styling has the drawback that pseudo selections can't be used.
- Using a specific CSS file has the drawback that the styles are global.

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

- Install it `npm install --save styled-components`

<iframe height=500 src="https://stackblitz.com/edit/carlba-js-react-styled-components?embed=1&file=src/App.js&hideExplorer=1"></iframe>

### 71. More on Styled Components

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/16851072

### 73. Working with CSS Modules

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/16851076

<iframe height=600 src="https://stackblitz.com/edit/carlba-js-react-css-modules?embed=1&file=src/App.js"></iframe>

https://create-react-app.dev/docs/adding-a-css-modules-stylesheet

### 74. CSS Modules & Media Queries

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/16851078

### 75. More on CSS Modules

**CSS Modules** are a relatively new concept (you can dive super-deep into them here: https://github.com/css-modules/css-modules). With CSS modules, you can write normal CSS code and make sure, that it only applies to a given component.

It's not using magic for that, instead it'll simply **automatically generate unique CSS class names** for you. And by importing a JS object and assigning classes from there, you use these dynamically generated, unique names. So the imported JS object simply exposes some properties which hold the generated CSS class names as values.

**Example:**

**In Post.css File**

```css
.Post {
  color: red;
}
```

**In Post Component File**

```jsx
import classes from './Post.css';

const post = () => <div className={classes.Post}>...</div>;
```

Here, `classes.Post` refers to an automatically generated `Post` property on the imported `classes` object. That property will in the end simply hold a value like `Post__Post__ah5_1` .

So your `.Post` class was automatically transformed to a different class (`Post__Post__ah5_1` ) which is unique across the application. You also can't use it accidentally in other components because you don't know the generated string! You can only access it through the `classes` object. And if you import the CSS file (in the same way) in another component, the `classes` object there will hold a `Post` property which yields a **different** (!) CSS class name. Hence it's scoped to a given component.

By the way, if you somehow also want to define a global (i.e. un-transformed) CSS class in such a `.css` file, you can prefix the selector with `:global` .

**Example:**

```css
:global .Post {
  ...;
}
```

Now you can use `className="Post"` anywhere in your app and receive that styling.

## Section 6: Debugging React Apps

### 78. Understanding Error Messages

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094604

### 79. Finding Logical Errors by using Dev Tools & Sourcemaps

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094606

### 80. Working with the React Developer Tools

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094608

React has a nice [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
for debugging purposes.

### 81. Using Error Boundaries (React 16+)

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094610

## Section 7: Diving Deeper into Components & React Internals

- More on useEffect(): https://reactjs.org/docs/hooks-effect.html
- State & Lifecycle: https://reactjs.org/docs/state-and-lifecycle.html
- PropTypes: https://reactjs.org/docs/typechecking-with-proptypes.html
- Higher Order Components: https://reactjs.org/docs/higher-order-components.html
- Refs: https://reactjs.org/docs/refs-and-the-dom.html

### 85. A Better Project Structure

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8103728

* What goes into what component is a tricky question.
  * Don't overdo it if there is a need for splitting things up then do it.
* The App component should be light on rendering logic and instead outsource that to subcomponents.

### 86. Splitting an App Into Components

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556244

### 87. Comparing Stateless and Stateful Components

https://kutt.it/MHhUyA

* A component can use state either by using the `this.state` property in a class based component or by using the `useState()` function.
* Eventhough functional components support state nowadays presentaitional component should still be prefered.
* Try to limit youself to a couple of components that are involved in the state managnment.

### 88. Class-based vs Functional Components

https://kutt.it/qxA6yI

![image-20210127092729210](https://cdn.jsdelivr.net/gh/carlba/assets@master/Wl7jq6-image-20210127092729210.png)

### 89. class Component Lifecycle Overview

https://kutt.it/vHZwyJ

* Only availible in class based in component

![image-20210127093537470](https://cdn.jsdelivr.net/gh/carlba/assets@master/N6vvcs-image-20210127093537470.png)

![image-20210127094327611](https://cdn.jsdelivr.net/gh/carlba/assets@master/ZwuilH-image-20210127094327611.png)

### 90. Component Creation Lifecycle in Action

https://kutt.it/oa1Vez

* When the rendering method of a component is called it just means that Reacts virtual dom will be rerendered. The real DOM will only get updated if React sees the need for it.

### 91-92. Component Update Lifecycle

https://kutt.it/4XIrOH

* Components are updated on state and props change
* The most used hook by far is the `componentDidUpdate()`
* shouldComponentUpdate() can be used determine if a component should run it's update cycle or not.

![image-20210127101131818](https://cdn.jsdelivr.net/gh/carlba/assets@master/qNvh4R-image-20210127101131818.png)

```jsx
// src/components/Persons/Persons.js

import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Person.js] getDerivedStateFromProps()');
  //   return state;
  // }

  /**
   * Will determine if the component will run the update cycle or not. Use PureComponent
   * most when you want to compare all props on change. This is for when you need
   * more fine grain control.
   * @param {*} nextProps
   */
  // shouldComponentUpdate(nextProps) {
  //   console.log('[Person.js] shouldComponentUpdate()');
  //   // return nextProps.persons !== this.props.persons;
  //   return true;
  // }

  /**
   * This will allow you to create a snapshot that can then be retrieved in the
   * componentDidUpdate lifecycle hook.
   * @param {*} prevProps
   * @param {*} prevSate
   */
  getSnapshotBeforeUpdate(prevProps, prevSate) {
    console.log('[Person.js] shouldComponentUpdate()');
    return { message: 'Snapshot!' };
  }

  /**
   * Triggered after the component updated also has the snapshot set in
   * getSnapshotBeforeUpdate
   */
  componentDidUpdate(prevProps, prevSate, snapshot) {
    console.log('[Person.js] componentDidUpdate()', snapshot);
  }

  /**
   * Triggered before component is destroyed/unmounted
   */
  componentWillUnmount() {
    console.log('[Person.js] componentWillUnmount()');
  }
  render() {
    console.log('[Persons.js] render()');
    return this.props.persons.map((person, index) => (
      <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        changed={event => this.props.changed(event, person.id)}
        key={person.id}
      />
    ));
  }
}

export default Persons;

```

### 93-94. Using useEffect() in Functional Components

https://kutt.it/SxwZHQ

https://kutt.it/hc6DT1

* `useEffect()` combines all functionality provided in the class based life cycle hooks into one function

* `useEffect()` is called on each change and also once when the page is loaded

* The second argument of useEffect() is an array of parts of the props that will control what part of the props will trigger the effect.

  ```jsx
    useEffect(() => {
      console.log('[Cockpit.js] useEffect()');
  
      setTimeout(() => alert('Saved data to cloud!'), 1000);
    }, [props.persons]);
  ```

* If an empty array is passed as the second argument the effect will only trigger when the component is loaded.

* If a function is returned from the `useEffect()` callback method. That function will be executed afther the component has been unmounted/destroyed.

<iframe height=600px src="https://stackblitz.com/edit/carlba-js-react-useeffect?embed=1&file=src/App.js"></iframe>

### 95.Cleaning up with Lifecycle Hooks & useEffect()

https://kutt.it/7SKooX

* In a ClassBased component `componentDidUnMount()` is called before a component is destroyed.

* If a function is returned from the `useEffect()` callback method. That function will be executed afther the component has been unmounted/destroyed.

  ```jsx
    useEffect(() => {
      console.log("[Component] change")
      return () => console.log('[Component] cleanup')
    });
  ```

### 96. Cleanup Work with useEffect() - Example

https://kutt.it/fuE3Ak

### 97. Using shouldComponentUpdate or PureComponent for Optimisation

https://kutt.it/zA6Vsf

A good way to optimize performance is to prevent changes to certain components from affecting other parts of the application. A good way of doing that is to use the `shouldComponentUpdate()` life cycle hook. By configuring a condition for the update we can prevent a component from being rendered if it's content hasn't been changed.

```jsx
  shouldComponentUpdate(nextProps) {
    console.log('[Person.js] shouldComponentUpdate()');
    return nextProps.persons !== this.props.persons;
  }
```

**NOTE** that this only does a shallow comparison 

A better alternative if you just want to check if any of the props for a component has changed is to extend the class based component from `PureComponent`

https://kutt.it/0aKROa



### 98. Optimizing Functional Components with React.memo()

https://kutt.it/X25cAW

`React.memo(Component)` can be sued to  prevent child components from re rendering. It matches all props (shallow only).It is possible to use the second argument to we can decide how the equality check is done.

```jsx
React.memo(Component, [areEqual(prevProps, nextProps)]);
```
### 99. When should you update?

https://kutt.it/FviY79
https://dmitripavlutin.com/use-react-memo-wisely/

Only optimize if there are things outside the component that could trigger a re render even though it is not needed.



### 101. How React Updates the DOM

https://kutt.it/mf6VOe

![image-20210130194057018](https://cdn.jsdelivr.net/gh/carlba/assets@master/uxQB3f-image-20210130194057018.png)



### 102. Rendering Adjacent JSX Elements With React.Fragment

https://kutt.it/e5ZHMK
https://kutt.it/cfRvO7

An `Aux` component can be used to wrap elements without having to add a redundant div. 

<iframe height=500px src="https://stackblitz.com/edit/carlba-js-react-adjecent-jsx-elements-with-aux-component?file=src/App.js">
**In later versions of React there is an inbuilt component called `React.Fragment` use that instead.**

### 105. Higher Order Components (HOC) - Introduction

https://kutt.it/Dm4Boq

https://kutt.it/eWNKvK

An higher order component is a component that wraps an other component and modifies it's behaviour in some way. A super simplistic example can be found below.

```jsx
import React from 'react';

const WithClass = props => <div className={props.classes}>{props.children}</div>;
const Component = props => <WithClass classes={'red'}></WithClass>

export default WithClass;

```

Another way of achieving the same way is doing this.

```jsx
const withClass = (WrappedComponent, className) => {
  return props => 
    (<div className={className}>
    	<WrappedComponent ...props />
    </div>)
};
```

```jsx
export default withClass(App, styles.App);
```

The default export must then be wrapped instead.

* The inline JSX method should be used for HOC functions that add things into the HTML.
* The second approach for things that adds logic.

#### 107. Passing Unknown Props

https://kutt.it/6b3Af7

**When using the second method it will be necessary to pass along props through the wrapper component, like so:**

```jsx
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};
```

The spread operator allows all incoming props to also exist on the returned component.

### 108. Setting State Correctly

https://kutt.it/eOox42

If the state is set like this in Class Based components:

```jsx
    this.setState({
      persons,
      changeCounter: this.state..changeCounter + 1
    });
```

React does not guarntee that this.state contains the latest state which can lead to bad bugs. The below syntax guarantees that you use the previous state.

```jsx
this.setState((prevState, props) => ({
  persons,
  changeCounter: prevState.changeCounter + 1
}));
```

**Please ensure this is only used when the updated states needs to build on the previous state.**

### 109. Using PropTypes

https://kutt.it/saTk2j

Runtime type enforcing.

```bash
npm install --save prop-types
```

The types are declared by adding a type declaring object to any component, like this:

```jsx
Component.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  changed: PropTypes.func
};
```

* isRequired can be chained to a type to indicate that the prop is mandatory



### 110. Using Refs

https://kutt.it/kzAbtk

Use refs to get a hold of a specific component through the template.

<iframe height=500px src="https://stackblitz.com/edit/carlba-js-react-template-class-based?embed=1&file=src/App.js"></iframe>

**111. Use refs in functional components**

https://kutt.it/lVc5SF

```jsx
const Div = () => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.textContent = 'Text was changed thrugh ref in useEffect()';
  });
  return <div ref={divRef}>Initial Div Text</div>;
};
```

### 112. Understanding Prop Chain Problems

https://kutt.it/NXQ10U

### 113. Using the Context API

https://kutt.it/8hM8DA

The context API allows us to create an object that can be accessed from all other components.

* Changing a context object does not re render the DOM.

A context is created, like so:

```jsx
// src/context/auth-context.js

import React from 'react';

const authContext = React.createContext({ authenticated: false, login: () => {} });

export default authContext;

```

A `AuthContext.Provider` component must wrap all components that are going to use the context. A value must also be passed into the `Provider` thus making it available anywhere in the scope of the wrapper. 

```jsx
<AuthContext.Provider
  value={{ authenticated: this.state.authenticated, login: this.loginHandler }}
  >
  <Component></Component>
  <Component2></Component2>
</AuthContext.Provider>  
```

And can finally be accessed from any component within the outer wrapper, like so:

```jsx
<AuthContext.Consumer>
  {context => {
    return context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>;
  }}
</AuthContext.Consumer>
```

**NOTE** `AuthContext.Consumer` will put the content into a function that needs to be nested within it.

### 114. contextType & useContext()

https://kutt.it/MtDZd3

A nicer alternative to the above approach is to connect the context to the component using the static property `contextType`. By doing this the context will be available both in the component and in the template in the `this.context` property.

```jsx
class Person extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context.authenticated)
  }
  render() {
    return (
      <Aux className={styles.Person}>
        {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
      </Aux>
    );
  }
}
```

In a functional component the same can be accomplished using the useContext() hook.

```jsx
const Cockpit = props => {  
  const authContext = useContext(AuthContext);
  return (
    <div className={styles.Cockpit}>
      <button onClick={authContext.login}>Log In</button>
    </div>
  );
}
```

## Section 8: A Real App: The Burger Builder (Basic Version)

### 119. Planning an App in React - Core Steps

https://kutt.it/VLS3GK

![image-20210131231456629](https://cdn.jsdelivr.net/gh/carlba/assets@master/ZKZsFl-image-20210131231456629.png)

### 120. Planning our App - Layout and Component Tree

https://kutt.it/ZxlWQ7

![image-20210131233310542](https://cdn.jsdelivr.net/gh/carlba/assets@master/jizj9T-image-20210131233310542.png)

### 121. Planning the State

https://kutt.it/b2rBHp

* The state will be managed at the level of the `BurgerBuilder` since it isn't really interesting for the other components outside of it.
* The Burger builder will be a stateful container component. The rest of it with be presentational components.

### 123. Setting up the Project

https://kutt.it/cLLBHO

### 124. Creating a Layout Component

https://kutt.it/Vb38Xz

### 125. Starting Implementation of The Burger Builder Container

https://kutt.it/yX9Ndc

### 126. Adding a Dynamic Ingredient Component

https://kutt.it/yWPZGe

### 127. Adding Prop Type Validation

https://kutt.it/JwHtN2

### 128. Starting the Burger Component

https://kutt.it/E9SAM3

### 129. Outputting Burger Ingredients Dynamically

https://kutt.it/bpgrFI

### 130. Calculating the Ingredient Sum Dynamically

https://kutt.it/o6ZYFn

### 131. Adding the Build Control Component

https://kutt.it/Ashjuz

### 132. Outputting Multiple Build Controls

https://kutt.it/wlgxgd

