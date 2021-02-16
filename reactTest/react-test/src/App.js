// Alternatively: import {Component} from 'react';
// Allows use of: class App extends Component {}
// instead of: class App extends React.Component {}
import React from 'react';

// Add new webpages to react. Files are assumed to .js by default.
import NewPage from './newPage';

import logo from './images/logo.svg';
import './stylesheets/App.css';

// Arguments passed to react function components are always passed as objects.
// As such, reference specific object properties to get the value of the
// argument passed.
// is not allowed.
function SayHello(user) {
  // Demonstrates setting a defualt value. In react, input properties are read
  // only and cannot be modified. For example:
  // props.sum = props.sum + var
  // would be invalid. This is why a new variable needs to be defined.
  const userName = user.name || 'world'
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
      {/* Commenting within html tags in JSX must be done this way.*/}
      hello {user.name}
    </div>
  )
}

function TestLink(props) {
  if (props.href && props.text) {
    return (<div><a href={props.href}>{props.text}</a></div>)
  }
  return (<div>insufficient link parameters</div>)
}

// function App(user) {
//   return (
//     <div className="App">
//       {/* Function can reference other functions in the same file.*/}
//       <SayHello name={user.name}/>
//       <img src={logo} className="App-logo" alt="logo"/>
//       <TestLink href="./new-page.html" text="test link"/>
//     </div>
//   )
// }

// Below is the class version of a react function component. Prior to the
// introduction of state and effect hooks in React 16.8, function components
// were inferior to class components in functionality. Currently, it is hinted
// that function components may confer performance advantages over class
// components.

class App extends React.Component {
  constructor(user) {
    // Any class component with a constructor must call the super function.
    super(user);
    // You can define default values if needed here.
    this.userName = user.name
  }

  render() {
    // If if is needed, it is defined inside the render block:

    // if (this.userName) {
    //   return (
    //     <div className="App">
    //       <SayHello name={this.userName}/>
    //       <img src={logo} className="App-logo" alt="logo"/>
    //       <TestLink href="./new-page.html" text="test link"/>
    //     </div>
    //   )
    // }

    return (
      <div className="App">
        <SayHello name={this.userName}/>
        <img src={logo} className="App-logo" alt="logo"/>
        <TestLink href="./new-page.html" text="test link"/>
      </div>
    )
  }
}

export default App;
