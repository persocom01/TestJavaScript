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
// destructuring syntax demonstrated later.
function SayHello(props) {
  // Demonstrates setting a default value. In react, input properties are read
  // only and cannot be modified. For example:
  // props.sum = props.sum + var
  // would be invalid. This is why a new variable needs to be defined.
  const name = props.name || 'world';
  // All react components may only have a single tag at the highest level.
  // This means, for example, that you cannot return in the same component:
  // <div></div><div></div>
  // If you don't want to use a parent div tag, you can instead use:
  // <React.Fragment key={var}></React.Fragment>
  // When using React.Fragment, one can also pass it a key attribute whereby
  // the fragment will return a key warning error if not present.
  // React.Fragment can also be written in short hand without keys like this:
  // <></>
  return <div>hello {name}</div>
}

function Button(props) {
  const handleClick = e => {
    if (!props.disabled && props.onClick) props.onClick(e)
  }
  return (
    // Demonstrates another way to set default values.
    <button className={props.className} type={props.type || 'button'} name={props.name} disabled={props.disabled}onClick={handleClick}>
      {/* Commenting within html tags in JSX must be done this way. */}
      {props.value || props.children || 'click me!'}
    </button>
  )
}

// Demonstrates use of JS destructuring syntax to reference object properties
// directly as well as setting their default value.
// {type} gets the value of the type property from the object passed.
function TestInputBox({type, placeholder='type text here'}) {
  const [input, setInput] = useState('')
  // React function components that use JSX need to be in PascalCase or an error
  // will occur. However, event handler functions are written in camelCase.
  function handleChange(e) {
    setInput(e.target.value)
    console.log(e.target.value)
  }
  return (
    <div>
      {/* onChange returns a synthetic event with properties such as:
        name, value */}
      <input type={type} name="user" placeholder={placeholder} onChange={handleChange} value={input}/>
    </div>
  )
}

function TestLink(props) {
  // Demonstrates an if statement in a function component.
  if (props.href && props.value) {
    return <a href={props.href}>{props.value}</a>
  }
  // Demonstrates returning a text string.
  return 'insufficient link parameters'
}

function App(props) {
  // Demonstrates the use of state hooks.
  // Note that useState(initialState) returns an array containing the current
  // state as well as a function with which to change the state. The function
  // can be called using functionName(newState).
  const [clockwise, setClockwise] = useState(true)
  const reverseSpin = () => setClockwise(!clockwise)
  return (
    <div className="App">
      {/* Function can reference other functions in the same file.*/}
      <SayHello name={props.name}/>
      {/* Demonstrates conditional classes based on state.*/}
      <img src={logo} className={"App-logo" + (clockwise ? "" : " reverse")} alt="logo"/>
      <div><Button value="reverse spin" onClick={reverseSpin}/></div>
      <TestInputBox placeholder="type text here"/>
      <div><TestLink href="./new-page.html" value="test link"/></div>
    </div>
  )
}

export default App;
