# Mastering React

## Getting Started

- What is React

  - A library, as opposed to Angular, which is a framework
  - Has a virtual DOM, where it keeps a lightweight representation of the real DOM
    - When the state of a component changes, its React Element is updated. React then figures out what elements have changed in the Virtual DOM and updates the respective elements in the real DOM. So, React reacts to changes in the virtual DOM and apply those to the Real DOM.

- Setting up the development environment

  - Install Node.js
  - Install the React library
    ```sh
    sudo npm i -g create-react-app@1.5.2
    ```
  - Install VS Code
    - Install the **Simple React Snippets** extension
    - Install the **Prettier** extension and turn on _Format on Save_ in your settings
  - Download the [React devtools](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html#installation) for your browser

- Creating the React app

  - ```sh
    create-react-app <app_name>
    ```
    - Installs development server, webpack, babel, etc
      > Babel is a modern JS compiler, which takes JSX in this case and convert it to plain JS.

- Writing Hello World

  - Hot module reloading: changes are automatically applied and refreshed upon saving
  - _index.js_

    ```js
    // React is after the JSX compilation by Babel
    import React from "react";
    import ReactDOM from "react-dom";

    const element = <h1>Hello World</h1>;
    console.log(element);

    ReactDOM.render(element, document.getElementById("root"));
    ```

- Custom Configs

  - Only used the `npm eject` command if you are experienced and know what you are doing. `npm eject` creates a new **config** folder and adds non-React dependencies in **package.js**.

- Some backend solutions

  - ASP.NET (C#)
  - Node + Express (JavaScript)
  - Firebase (Google solution)

## ES6 Refresher

- `let` vs `var` vs `const`

  - `var`: accessible inside the function it is declared
  - `let`: accessible only inside the block it is declared
  - `const`: block-scoped like `let`
  - Order of recommendation when coding: `const`, `let`, `var`

- Objects

  - ```js
    // One object with 3 members
    const person = {
      // Property
      name: "john",
      // Method
      walk: function () {},
      // Method (as of ES6)
      talk() {},
    };
    ```

- The `this` keyword

  - The value of `this` is determined by how a function is called (behaves differently from other languages)
    - If we call a function as a method in an object, `this` will always return a reference to that object
    - If we call a function as a stand-alone object or outside of an object, this will return the `window` object in browsers (if you get `undefined`, it means that the strict mode is enabled)

- Binding `this`

  - Functions in JavaScript are objects, so you can use the default method `bind` of objects to bind `this` to the intended object as follows:
    ```js
    const person = {
      name: "john",
      walk() {
        console.log(this);
      },
    };
    // Returns the person object
    person.walk();
    // Returns undefined if strict mode is on, or the window object otherwise
    const walk = person.walk;
    walk();
    // Returns the person object
    const _walk = person.walk.bind(person);
    _walk();
    ```

- Arrow Functions

  ```js
  const square = function (number) {
    return number * number;
  };

  // "number goes to number times number"
  const _square = (number) => number * number;

  console.log(_square(5));
  ```

- Arrow Functions adn `this`

  - Arrow functions don't rebind the `this` keyword

    ```js
    const person = {
      talk() {
        setTimeout(function () {
          console.log("this", this);
        }, 1000);
      },
    };
    // Returns the `window` object (strict mode does override the behavior of callback functions)
    person.talk();
    ```

    ```js
    const person = {
      talk() {
        setTimeout(() => console.log("this", this), 1000);
      },
    };
    // Returns the person object
    person.talk();
    ```

- `Array.map` method

  - Used to render a list of items
  - Using `map` and template literal:
    ```js
    const colors = ["red", "green", "blue"];
    const items = colors.map((color) => `<li>${color}</li>`);
    ```

- Object Destructuring

  - ```js
    const address = {
      street: "",
      city: "",
      country: "",
    };

    // Avoid
    const street = address.street;
    const city = address.city;
    const country = address.country;

    // Instead, use object destructuring
    const { street, city, country } = address;

    // Extracting only one attribute and creating an alias "st" for it
    const { street: st } = address;
    ```

- Spread operator (`...`)

  - Can be applied both to arrays and objects

    ```js
    const first = { first_name: "john" };
    const second = { last_name: "smith" };

    const combined = { ...first, middle_name: null, ...second };
    ```

- Classes

  ```js
  class Person {
    constructor(name) {
      this.name = name;
    }

    walk() {
      console.log("walk");
    }
  }

  const person = new Person("John");
  ```

- Inheritance

  - ```js
    // class Person {...}

    class Teacher extends Person {
      constructor(name, degree) {
        super(name);
        this.degree = degree;
      }

      teach() {
        console.log("teach");
      }
    }

    const teacher = new Teacher("John", "PhD");
    ```

- Modules

  - _person.js_

    ```js
    export class Person {
      constructor(name) {
        this.name = name;
      }

      walk() {
        console.log("walk");
      }
    }

    const person = new Person("John");
    ```

  - _teacher.js_

    ```js
    import { Person } from "./person";

    export class Teacher extends Person {
      constructor(name, degree) {
        super(name);
        this.degree = degree;
      }

      teach() {
        console.log("teach");
      }
    }
    ```

  - _index.js_

    ```js
    import { Teacher } from "./teacher";

    const teacher = new Teacher("John", "PhD");
    teacher.teach();
    ```

- Named and Default Exports

  - Classes are technically objects in JavaScript because classes wrap around constructor functions, which are objects themselves for being functions
  - Default export: `export default ...` -> `import ... from "...";`
  - Named export: `export ...` -> `import { ... } ... from "...";`
  - There can be a combination of default and named exports:
    ```js
    import React, { Component } from "react";
    ```
  - `Ctrl + space`: shows options (variables, functions, etc) you can write

- Setting up the project:
  - ```sh
    npm i bootstrap@4.1.1
    ```
- `Cmd + P`: Go to file...

- There are two ways to create components in React: using classes and functions

- Specifying children

  - Use `<React.Fragment> ... </React.Fragment>` as the wrapper element
  - `Cmd + D`: multi-cursor editing

- Embedding expressions

  - `{ variable }`: used to render `variable` dynamically&mdash;`variable` can be any valid JS expression

- Setting attributes

  - Instead of using `class`, which is a reserved keyword in JavaScript, use `className` as an attribute for specifying a class for an element
  - You can use the `styles` attribute in an element:
    - Passing in an object with CSS-ish attributes: `style={ object }`
    - In-line: `style={{ fontSize: 30 }}`

- Rendering classes dynamically

  - `^ + Shift + R`: Refactor... (selected lines of code), click on 'Extract to method in class '<class_name>`, and change the name of your new method
    - This helps **render** to become cleaner and easy to understand

- Rendering lists

  - Whenever you are using `map`, mapping a list item to a JSX element, you need use the key attribute
    ```js
    // ...
    state = {
      count: 0,
      tags: ["tag1", "tag2", "tag3"],
    };
    // ...
    <ul>
      {this.state.tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>;
    ```

- Conditional Rendering

  - The logical `&&` works as an `if` statement (in JavaScript, you can apply `&&` between non-boolean values)
    ```js
    <div> { this.state.tags.length === 0 && "Hello world!"; } </div>
    ```
    - truthy vs falsy
  - Or you can create a method (within a React class) that uses JavaScript for doing `if else` statements and returns HTML elements. This method can then be used within the elements being returned in the `render` method.

- Handling Events

  - You pass the function reference as an expression to the event&mdash; you do not call the function (no parenthesis)

  ```js
  handleIncrement() {
    console.log("Increment Clicked");
  // ...
  // you pass the function, not call the function (no parenthesis)
  <button
    onClick={this.handleIncrement}
    className="btn btn-secondary btn-sm"
  >
    Increment
  </button>
  }
  ```

- Binding event handlers

  - In the function being passed to an event handler, you don't have access to `this`
    - Because `handleIncrement` is a stand-alone function, not an object method (if the strict mode is enable, this returns undefined; otherwise, the `window` object)
    - Solution: arrow function
      ```js
      handleIncrement = () => {
        console.log("Increment Clicked", this);
      };
      ```

- Updating the state

  - ```js
    //...
    state = {
      count: 0,
    };
    //...
    this.setState({ count: this.state.count + 1 });
    ```

- Passing event arguments

  - Pass arrow function to `onClick`:
    ```js
    onClick={() => this.handleIncrement(product)}
    ```

- Setting up a new project

  - Install `bootstrap` and `font-awesome`
  - Inspect browser tool shortcut: `Shift + Cmd + C`
  - `_id`: prefixed with `_` because that's the default name of the ID column in MongoDB

- Exercise comments
  - In JSX, if there is nothing between the opening and closing tag you should use the self-closing syntax (`<TagName \>`)
  - Shortcut for making a table:
    - `table.table>thead>tr>th*4` (create table, with `className=table`, a table head, one table row, and 4 table header cells)
    - This technique is called Zen Coding
    - `key` prop must be set in the outer most element
    - In modern JavaScript, if key and value are the same when using `this.setState()`, you can omit the value:
      ```js
      // Before
      this.setState({ movies: movies });
      // After
      this.setState({ movies });
      ```

## Composing Components

- Passing data to components

  - Every React component has a property called `props`, which is a plain JavaScript object that includes all the attributes that we set when using the component in another component
    - the `key` attribute is not part of `props` because it's a special attribute for uniquely identifying elements
  - `this.props.<attribute>`: how to access a certain attribute being passed in a parent elements through props
    ```js
    // counters.jsx (parent component)
    {
      this.state.counters.map((counter) => (
        <Counter key={counter.id} value={counter.value} selected={true} />
      ));
    }
    //
    // counter.jsx (child component itself)
    state = {
      count: this.props.value,
    };
    ```
  - To change all occurrences of a given word, ut the cursor on that word, press `F2`, type the new word and hit `Return`
  - When passing props, `selected={true}` is equivalent to `selected`

- Passing children

  - `this.props.children`: when you want to pass complex elements to a child component such as a dialogue box, you use the `children` prop attribute
    - `children` receives whatever is passed between the opening and closing tags of a component

- Debugging React apps

  - Install React Developer Tools and and use it in the browser's Inspect tool
  - `$r`: can print in the console any component of our page
    - To use it, first select what component you want to analyze in the Components tab, then type `$r` in the Console tab
  - `$0` is a similar variable to `$r` that is useful to debugging an element form the Elements tab

- Props vs State

  - Props: any data that you give to a component (read onl)
  - State: any data local or private to a component

- Raising and handling events

  - Rule of thumb: the component that owns a piece of the state should be the one modifying it
  - Components can raise events (e.g.: child to parent, cm)

- Single source of truth

  - The local state of a component is disconnected from the corresponding prop attributes that gets updated

- Removing the local state

  - Control component: it does not have its own local state; it receives all date via props and raises events whenever data needs to be changed()
  - Use `setState()` to modify the state of a component (never modify the state directly)

- Components in sync

  - You need to lift the state up in order to the root component in order to share the state of attributes across all components

- Stateless Functional Component

  - When you don't have states in a component, you may want to define a component using a function instead of a class
  - `sfc`: shortcut for creating a stateless functional component
  - In functional components, you need to add `props` as a parameter

- Destructuring arguments

  - Instead of using the object `props` as an argument in a stateless functional component, you can use object destructuring in the argument:
    ```js
    // Before
    const NavBar = (props) => {};
    // After
    const NavBar = ({ totalCounters }) => {};
    ```

- Lifecycle hooks

  - Components go through a few phases during their lifecyle
    - Mount: when a component is created and inserted into the DOM
      - Lifecycle hooks: a few special methods that we can add to the components (React automatically call these methods)
      - 3 lifecycle hooks: `constructor()`, `render()`, and `componentDidMount()`
    - Update: happens when the state or the props of a component get changed
      - 2 lifecycle hooks: `render()`, and `componentDidUpdate()`
    - Unmount: happens when a component is removed from the DOM
      - 1 lifecycle hook: `componentWillUnmount()`
  - There are more lifecycle hooks, but the ones listed above are used most of the time

- Mounting phase

  - `constructor()`: can be used to set the state directly
    - `this.setState()` can be used only when a component is already rendered and placed in the DOM
    - If `props` is to used inside the constructor, `props` need to be passed as an argument to the constructor (don't forget to pass `props` to the parent class via `super()`)
  - When the component is mounted, it is the right time to use AJAX calls and get the data from the server
  - `render()`: when one component is rendered, all child components are rendered recursively
  - Lifecycle hooks are only used in class components (never in stateless functional component)

- Update phase

  - `render()`: called whenever the state or props of a component changes
    - Rerender the child components related to the update(happens in the virtual DOM)
    - We should not update the state directly (to preserve two different object references in memory):
      - Old virtual DOM
      - New Virtual DOM
    - React figures out what has changed and update the real DOM accordingly
  - `componentDidUpdate()`: called after a component is updated
    - We can compare old state with new state, or old props with new props, and make an AJAX to get new data from the server if there is a change (if there is no change, no AJAX request)

- Unmounting Phase
  - `componentWillUnmount()`: called just before a component is removed from the DOM
    - Gives an opportunity to do any kind of cleanup
      - e.g.: clean up timers or listeners before component is removed from the DOM to not end up with memory leaks
