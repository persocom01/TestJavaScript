// Alternatively: import {Component} from 'react';
// Allows use of: class App extends Component {}
// instead of: class App extends React.Component {}
import React from 'react';

// Add new webpages to react. Files are assumed to .js by default.
// import NewPage from './newPage';

import logo from './images/logo.svg';
import './stylesheets/App.css';

// Arguments passed to react function components are always passed as objects.
// As such, you normally need to reference specific object properties to get
// the value of the argument passed. However, one can shortcut this using JS
// destructuring syntax to reference the object property directly using the
// property name. So {name} gets the vlue of the name property from the object
// passed.
function sayHello({name}) {
  // Demonstrates setting a defualt value. In react, input properties are read
  // only and cannot be modified. For example:
  // props.sum = props.sum + var
  // would be invalid. This is why a new variable needs to be defined.
  let userName = name || 'world'
  // Demonstrates the function version of a class state.
  // userName = useState(userName)
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
      hello {userName}
    </div>
  )
}

function handleUserChange(e) {
  console.log(e.target.value)
}

function inputBox(prop) {
  let placeholder = prop.placeholder || 'type text here'
  return (
    <div>
      {/* onChange returns a synthetic event with properties such as:
        name, value */}
      <input type="text" name="user" placeholder={placeholder} onChange={handleUserChange}/>
    </div>
  )
}

function testLink(props) {
  // Demonstrates an if statement in a function component.
  if (props.href && props.text) {
    return (<div><a href={props.href}>{props.text}</a></div>)
  }
  return (<div>insufficient link parameters</div>)
}

// Below is a demonstration of a class type react component. It largely does
// the same as the function version above, but with some demonstration code
// added for class features. Prior to the introduction of state and effect
// hooks in React 16.8, function components were inferior to class components
// in functionality. Currently, it is hinted that function components may
// confer performance advantages over class components in future.

class App extends React.Component {
  constructor(props) {
    // Any class component with a constructor must call the super function.
    super(props);
    // You can define default values if needed here.
    this.userId = user.id || '007'

    // It is recommended that all properties that affect rendering be defined
    // in state. This is because react checks for changes in state every time
    // an event occurs.
    this.state = {
      // Equivalent of this.state.name = user.name || 'world'
      name: user.name || 'world'
    }

    // Demonstrates the bind method. This makes it such that any reference to
    // this refers to properties in the parent class instead of the method
    // itself. Alternatively, all methods can be written as arrow methods.
    this.SayHello = this.SayHello.bind(this);
  }

  SayHello(name) {

  }

  render() {
    // If if is needed, it is defined inside the render block:

    // if (this.userName) {
    //   return (
    //     <div className="App">
    //       <sayHello name={this.state.userName}/>
    //       <img src={logo} className="App-logo" alt="logo"/>
    //       <testLink href="./new-page.html" text="test link"/>
    //     </div>
    //   )
    // }

    return (
      <div className="App">
        {/* Note that userName is a property of state. */}
        <sayHello name={this.state.name}/>
        <img src={logo} className="App-logo" alt="logo"/>
        <inputBox placeholder="type text here"/>
        <testLink href="./new-page.html" text="test link"/>
      </div>
    )
  }
}

export default App;
