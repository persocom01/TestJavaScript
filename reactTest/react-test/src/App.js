// Alternatively: import {Component} from 'react';
// Allows use of: class App extends Component {}
// instead of: class App extends React.Component {}
import React from 'react';
// Allows use of state hooks in function components. Can also be written as a
// one liner with the above import:
// import React, {useState} from 'react';
import {useState} from 'react';

// Add new webpages to react. Files are assumed to .js by default.
// import NewPage from './newPage';

import logo from './images/logo.svg';
import './stylesheets/App.css';

// Arguments passed to react function components are always passed as objects.
// As such, you normally need to reference specific object properties to get
// the value of the argument passed. You can shortcut this using JS
// destructuring syntax as demonstrated later.
function SayHello(prop) {
  // Demonstrates setting a default value. In react, input properties are read
  // only and cannot be modified. For example:
  // props.sum = props.sum + var
  // would be invalid. This is why a new variable needs to be defined.
  let userName = prop.name || 'world';
  // Demonstrates the use of state hooks.
  // Note that useState(initialState) returns an array containing the current
  // state as well as a function with which to change the state. The function
  // can be called using functionName(newState).
  const [name, setName] = useState(userName);
  // All react components may only have a single tag at the highest level.
  // This means, for example, that you cannot return:
  // <div></div>
  // <div></div>
  // If you don't want to use a parent tag, you can use:
  // <React.Fragment key={var}></React.Fragment>
  // When using React.Fragment, one can also pass it a key attribute whereby
  // the fragment will return a key warning. error if it is not present. React.Fragment
  // can also be written in short hand without key like this:
  // <></>
  return (
    <div>
      {/* Commenting within html tags in JSX must be done this way. */}
      hello {name}
    </div>
  )
}

function handleUserChange(e) {
  console.log(e.target.value)
}

// Demonstrates use of JS destructuring syntax to reference the object property
// directly using the property name as well as set its default value.
// {placeholder} gets the value of the placeholder property from the object
// passed.
function InputBox({placeholder='type text here'}) {
  return (
    <div>
      {/* onChange returns a synthetic event with properties such as:
        name, value */}
      <input type="text" name="user" placeholder={placeholder} onChange={handleUserChange}/>
    </div>
  )
}

function TestLink(props) {
  // Demonstrates an if statement in a function component.
  if (props.href && props.text) {
    return (<div><a href={props.href}>{props.text}</a></div>)
  }
  return (<div>insufficient link parameters</div>)
}

function App(props) {
  return (
    <div className="App">
      {/* Function can reference other functions in the same file.*/}
      <SayHello name={props.name}/>
      <img src={logo} className="App-logo" alt="logo"/>
      <InputBox placeholder="type text here"/>
      <TestLink href="./new-page.html" text="test link"/>
    </div>
  )
}

export default App;
