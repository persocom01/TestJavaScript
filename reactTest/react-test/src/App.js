// Allows use of state hooks in function components. Can also be written as a
// one liner with the above import:
// import React, {useState} from 'react';
import {useState} from 'react';
// import $ from 'jquery';

// Add new webpages to react. Files are assumed to .js by default.
import Home from './home';

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
function TestInputBox({type, placeholder='type text here', loginSuccess}) {
  let states = {
    user: useState(''),
    password: useState(''),
    errorMsg: useState('')
  }

  // React function components that use JSX need to be in PascalCase or an error
  // will occur. However, event handler functions are written in camelCase.
  function handleChange(e) {
    // e.target refers to the element which raised the event. You might also
    // encounter e.currentTarget, which refers to the element that handles the
    // event. The difference being whether the event of the element bubbles up
    // to its parent container.
    states[e.target.name][1](e.target.value)
  }

  function doLogin() {
    const user = states.user[0]
    const password = states.password[0]
    const isUser = user === 'u'
    const isPassword = password === 'pw'

    console.log(`Login attempt
user: ${user}
password: ${password}`)

    // Demonstrates sending and receiving information from a http endpoint.
    // $.ajax({
    //   url: 'https://kdiris.azurewebsites.net/api/login',
    //   method: 'POST',
    //   // Data is sent as a string by default, and has to be converted to json
    //   // using JSON.stringify if you wish to send it as json.
    //   data: JSON.stringify({
    //     user: states.user[0],
    //     password: states.password[0]
    //   }),
    //   // Tells endpoint to expect a json file.
    //   contentType: 'application/json',
    //   success: function(data) {
    //     console.log(data);
    //   },
    //   error: function() {
    //     console.log('Error in communicating with backend');
    //   }
    // });

    if (isUser && isPassword) {
      loginSuccess({user: states.user[0]})
      states.user[1]('')
      states.password[1]('')
      states.errorMsg[1]('')
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
      {/* Demonstrates conditional rendering using &&. To render multiple lines,
        wrap them in (). */}
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

  // The above can alternatively be written in the following way so as to make
  // return only appear once:
  // let output = 'insufficient link parameters'
  // if (props.href && props.value) {
  //   output = <a href={props.href}>{props.value}</a>
  // }
  // return output
}

function App(props) {
  // Demonstrates setting a default value.
  const link = props.link || 'test link';
  // Demonstrates the use of state hooks.
  // useState(initialState) returns an array containing the current value of
  // the state as well as a function with which to change the value. The
  // function can be called using functionName(newState).
  const [clockwise, setClockwise] = useState(true)
  const [user, setUser] = useState('')
  const [activePage, setActivePage] = useState('login')

  const reverseSpin = () => setClockwise(!clockwise)
  const handleLogin = u => {
    setUser(u.user)
    setActivePage('home')
  }

  return (
    <div className="App">
      {activePage === 'login' && (
        <div>
          <div><TestLink href="./new-page.html" value={link}/></div>
          {/* Demonstrates conditional classes based on state.*/}
          <img src={logo} className={"App-logo" + (clockwise ? "" : " reverse")} alt="logo"/>
          <div><CheckBox value="reverse spin" onClick={reverseSpin}/></div>
          <TestInputBox placeholder="type text here" loginSuccess={handleLogin}/>
        </div>
      )}
      {activePage ==='home' && <Home/>}
    </div>
  )
}

export default App;
