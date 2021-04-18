// React components have a built in state object. When this object changed,
// react re-renders the component. To know when a variable should be defined as
// a state object property, consider if setState will always be called on it
// inside the render() function. Since the components re-renders when setState
// is called, this will cause react to throw an error as such an implementation
// will result in an infinite loop.
// Allows use of state hooks in function components. Can also be written as a
// one liner along with importing React:
// import React, {useState} from 'react';
import { useState, useEffect } from 'react';
// import $ from 'jquery';
import { Users } from './users'

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
  const handleChange = e => {
    if (!props.disabled && props.onChange) props.onChange(e)
  }
  const handleClick = e => {
    if (!props.disabled && props.onClick) props.onClick(e)
  }
  return (
    <>
      <input className={props.className} type="checkbox" name={props.name} id={props.id} onChange={handleChange} onClick={handleClick} defaultChecked={props.defaultChecked} />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  )
}

// Demonstrates the state hook version of a generic setState. The typical
// inplementation of state hooks can be found under the App function. Defining
// multiple state hooks as a single object allows the handleChange function to
// be made generic. It is recommended that states be handled in a main function
// and passed to child component functions, but this one handles its own states
// for demonstration purposes.
function TestInputBox({type, placeholder='type text here', loginSuccess, errorMsgState, busyState}) {
  const [errorMsg, setErrorMsg] = errorMsgState
  const [busy, setBusy] = busyState
  let [states, setState] = useState({
    user: '',
    password: ''
  })

  // React function components that use JSX need to be in PascalCase or an error
  // will occur. However, event handler functions are written in camelCase.
  function handleChange(e) {
    // e.target refers to the element which raised the event. You might also
    // encounter e.currentTarget, which refers to the element that handles the
    // event. The difference being whether the event of the element bubbles up
    // to its parent container.
    setState({ ...states, [e.target.name]: e.target.value })
  }

  function doLogin() {
    const user = states.user
    const password = states.password
    const isUser = user === Users.user
    const isPassword = password === Users.password

    console.log(`Login attempt
user: ${user}
password: ${password}`)

    // You set busy to prevent things like multiple logins or render a spinner.
    setBusy(true)

    // Demonstrates sending and receiving information from a http endpoint.
    // $.ajax({
    //   url: 'https://kdiris.azurewebsites.net/api/login',
    //   method: 'POST',
    //   // Data is sent as a string by default, and has to be converted to json
    //   // using JSON.stringify if you wish to send it as json.
    //   data: JSON.stringify({
    //     user: states.user,
    //     password: states.password
    //   }),
    //   // Tells endpoint to expect a json file.
    //   contentType: 'application/json',
    //   success: function(data) {
    //     console.log(data)
    //     if (data.status === 200) {
    //       loginSuccess() && loginSuccess({ user: states.user })
    //       setBusy(false)
    //     } else {
    //       console.log('invalid username or password')
    //       setBusy(false)
    //     }
    //   },
    //   error: function() {
    //     console.log('Error in communicating with backend')
    //     setState({ ...states, busy: false })
    //   }
    // })

    if (isUser && isPassword) {
      loginSuccess({ user: states.user })
      setState({
        ...states,
        user: '',
        password: ''
      })
      setErrorMsg('')
      setBusy(false)
    } else {
      setState({
        ...states,
        user: '',
        password: ''
      })
      setErrorMsg('you = u and password = pw')
      setBusy(false)
    }
  }

  return (
    <>
      <div>
        {/* Commenting within html tags in JSX must be done this way. */}
        {/* onChange returns a synthetic event with properties of the
          triggering element assigned to the event.target object. */}
        <input name="user" placeholder={placeholder} onChange={handleChange} value={states.user}/>
      </div>
      <div>
        <input name="password" placeholder={placeholder} onChange={handleChange} value={states.password}/>
      </div>
      {/* Function can reference other functions in the same file.*/}
      <div><Button value="Login" onClick={doLogin} /></div>
      {/* Demonstrates conditional rendering using &&. To render multiple lines,
        wrap them in (). */}
      {errorMsg && <div>{errorMsg}</div>}
    </>
  )
}

function TestLink(props) {
  // Demonstrates an if statement in a function component.
  if (props.href && props.value) {
    return <a href={props.href} onClick={props.onClick}>{props.value}</a>
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
  const initialPage = 'login'
  // Demonstrates the use of state hooks.
  // useState(initialState) returns an array containing the current value of
  // the state as well as a function with which to change the value. The
  // function can be called using functionName(newState).
  const [clockwise, setClockwise] = useState(true)
  const [user, setUser] = useState('')
  const [activePage, setActivePage] = useState('')
  // Since state hooks include their updating function, there is no need to
  // define a function to update their values that can be passed to a child.
  // However, the typical implmentation of state hooks also makes it more
  // difficult to pass alls state values to the child as they cannot be passed
  // as a single object.
  const [errorMsg, setErrorMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const initialize = () => setActivePage(initialPage)
  const handleClick = e => {
    // You need this to prevent the page from trying to reach the linked page.
    e.preventDefault()
    setActivePage('home')
  }
  const reverseSpin = () => setClockwise(!clockwise)
  const handleLogin = u => {
    setUser(u.user)
    setActivePage('home')
  }

  // Demonstrates the function equivalent of componentDidMount().
  useEffect(() => {
      initialize()
  }, [])

  return (
    <div className="App">
      {activePage === 'login' && (
        <div>
          <div><TestLink href="./home.html" onClick={handleClick} value={link}/></div>
          {/* Demonstrates conditional classes based on state.*/}
          <img src={logo} className={"App-logo" + (clockwise ? "" : " reverse")} alt="logo"/>
          <div><CheckBox label="reverse spin" onClick={reverseSpin}/></div>
          <TestInputBox placeholder="type text here" loginSuccess={handleLogin} errorMsgState={[errorMsg, setErrorMsg]} busyState={[busy, setBusy]}/>
        </div>
      )}
      {activePage ==='home' && <Home/>}
    </div>
  )
}

export default App;
