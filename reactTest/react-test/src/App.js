// Allows use of state hooks in function components. Can also be written as a
// one liner with the above import:
// import React, {useState} from 'react';
import {useState} from 'react';

// Add new webpages to react. Files are assumed to .js by default.
// import NewPage from './newPage';

import logo from './images/logo.svg';
import './stylesheets/App.css';

// Three ways of setting variable default values are demonstrated in this
// file:
// 1. Assigning a variable:
// var varName = props.propName || defaultValue
// 2. Using JS destructuring syntax in the argument instead of (props):
// function functionName ({propName1=value, propName2=value}) {}
// 3. Using {} inside the return value.
// return {props.propName || defaultValue}

// Arguments passed to react function components are passed as objects. As such,
// to return argument values, you need to reference properties of the object.
// The object is also read only and cannot be modified. This means that:
// props.sum = props.sum + var
// would be invalid. To modify them define a new local variable instead.
function Button(props) {
  const handleClick = e => {
    if (!props.disabled && props.onClick) props.onClick(e)
  }
  return (
    <button className={props.className} type={props.type || 'button'} name={props.name} disabled={props.disabled}onClick={handleClick}>
      {props.value || props.children || 'click me!'}
    </button>
  )
}

// All react components may only have a single tag at the highest level. This
// means, for example, that you cannot return in the same component:
// <div></div><div></div>
// If you don't want to use a parent div tag, you can instead use:
// <React.Fragment key={var}></React.Fragment>
// When using React.Fragment, one can also pass it a key attribute whereby the
// fragment will return a key warning error if not present. React.Fragment can
// also be written in short hand without keys like this:
// <></>
function CheckBox(props) {
  const handleClick = e => {
    if (!props.disabled && props.onClick) props.onClick(e)
  }
  return (
    <>
      <input type="checkbox" name={props.name} onClick={handleClick} defaultChecked={props.defaultChecked} />
      <label htmlFor={props.name}>{props.value}</label>
    </>
  )
}

// Demonstrates the state hook version of a generic setState. The typical
// inplementation of state hooks can be found under the App function. Defining
// multiple state hooks as a single object allows the handleChange function to
// be made generic.
function TestInputBox({type, placeholder='type text here'}) {
  let states = {
    user: useState(''),
    password: useState(''),
    errorMsg: useState('')
  }

  // React function components that use JSX need to be in PascalCase or an error
  // will occur. However, event handler functions are written in camelCase.
  function handleChange(e) {
    // e.target.name will return the value of the name property of the element
    // which triggered the event, much like props.name is to react components.
    states[e.target.name][1](e.target.value)
    console.log(e.target.value)
  }

  function doLogin() {
    const {user} = states.user[0]
    const {password} = states.user[0]
    const isUser = user === 'u'
    const isPassword = password === 'pw'

    console.log(`Login attempt
user: ${user}
password: ${password}`)

    if (isUser && isPassword) {
      console.log('login successful')
    } else {
      states.errorMsg[1]('you = u and password = pw')
    }
  }

  return (
    <>
      <div>
        {/* Commenting within html tags in JSX must be done this way. */}
        {/* onChange returns a synthetic event with properties of the
          triggering element assigned to the event.target object. */}
        <input name="user" placeholder={placeholder} onChange={handleChange} value={states.user[0]}/>
      </div>
      <div>
        <input name="password" placeholder={placeholder} onChange={handleChange} value={states.password[0]}/>
      </div>
      {/* Function can reference other functions in the same file.*/}
      <div><Button value="Login" onClick={doLogin} /></div>
      {/* Demonstrates conditional rendering. To render more than one line, use
        () to wrap multiple lines */}
      {states.errorMsg[0] && <div>{states.errorMsg[0]}</div>}
    </>
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
  // Demonstrates setting a default value.
  const link = props.link || 'test link';
  // Demonstrates the use of state hooks.
  // useState(initialState) returns an array containing the current value of
  // the state as well as a function with which to change the value. The
  // function can be called using functionName(newState).
  const [clockwise, setClockwise] = useState(true)
  const reverseSpin = () => setClockwise(!clockwise)
  return (
    <div className="App">
      <div><TestLink href="./new-page.html" value={link}/></div>
      {/* Demonstrates conditional classes based on state.*/}
      <img src={logo} className={"App-logo" + (clockwise ? "" : " reverse")} alt="logo"/>
      <div><CheckBox value="reverse spin" onClick={reverseSpin}/></div>
      <TestInputBox placeholder="type text here"/>
    </div>
  )
}

export default App;
