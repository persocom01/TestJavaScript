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
  // All react components may only have a single tag at the highest level.
  // This means, for example, that you cannot return in the same component:
  // <div>content1</div>
  // <div>content2</div>
  // If you don't want to use a parent div tag, you can instead use:
  // <React.Fragment key={var}></React.Fragment>
  // When using React.Fragment, one can also pass it a key attribute whereby
  // the fragment will return a key warning error if not present.
  // React.Fragment can also be written in short hand without keys like this:
  // <></>
  return (
    <div>
      {/* Commenting within html tags in JSX must be done this way. */}
      hello {name}
    </div>
  )
}

function Button(props) {
  return (
    // One way to set default values is to do so while using them.
    <button
      className={props.className}
      type={props.type || 'button'}
      name={props.name}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text || 'click me!'}
    </button>
  )
}

// Demonstrates use of JS destructuring syntax to reference object properties
// directly as well as setting their default value.
// {type} gets the value of the type property from the object passed.
function TestInputBox({type='text', placeholder='type text here'}) {
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
  if (props.href && props.text) {
    return (<a href={props.href}>{props.text}</a>)
  }
  // Demonstrates returning a text string.
  return ('insufficient link parameters')
}

function App(props) {
  // Demonstrates setting a default value. In react, input properties are read
  // only and cannot be modified. For example:
  // props.sum = props.sum + var
  // would be invalid. This is why a new variable needs to be defined.
  const name = props.name || 'world';
  // Demonstrates the use of state hooks.
  // Note that useState(initialState) returns an array containing the current
  // state as well as a function with which to change the state. The function
  // can be called using functionName(newState).
  const [clockwise, setClockwise] = useState(true)
  const handleClick = () => setClockwise(!clockwise)
  return (
    <div className="App">
      {/* Function can reference other functions in the same file.*/}
      <SayHello name={name}/>
      {/* Demonstrates conditional classes based on state.*/}
      <img src={logo} className={"App-logo" + (clockwise ? "" : " " + "reverse")} alt="logo"/>
      <div><Button text="reverse spin" onClick={handleClick}/></div>
      <TestInputBox placeholder="type text here"/>
      <div><TestLink href="./new-page.html" text="test link"/></div>
    </div>
  )
}

export default App;
