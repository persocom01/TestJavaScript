import logo from './logo.svg';
import './App.css';

// Arguments passed to react functions are always passed as objects. As such,
// to avoid errors, you need to either iterate through the object keys or
// reference specific object properties.
// In addition react has a rule in that input properties to react components
// cannot be modified. For example,
// props.sum = props.sum + var
// is not allowed.
function TestLink(props) {
  return (
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
    <div>
      {/* Commenting within html tags in JSX must be done this way.*/}
      <a href={props.href}>{props.text}</a>
    </div>
  )
}

// function App(user) {
//   if (user.name) {
//     return (
//       <div className="App">
//         hello {user.name}
//         {/* The main function can reference other functions in the same file.*/}
//         <TestLink href="./test.html" text="test link"/>
//       </div>
//     );
//   }
//   return (
//     <div className="App">
//       hello world
//       <TestLink href="./test.html" text="test link"/>
//     </div>
//   );
// }

// Alternatively, write:
// import {Component} from 'react';
// at the top of the app. This allows you to use:
// class App extends Component {}
// instead.
class App extends React.Component {
  constructor(user) {
    super(user);
  }

  if (user.name) {
    render() {
      return (
        <div className="App">
          hello {user.name}
          {/* The main function can reference other functions in the same file.*/}
          <TestLink href="./test.html" text="test link"/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="App">
        hello world
        <TestLink href="./test.html" text="test link"/>
      </div>
    )
  }
  // render() {
  //   return (
  //     <div className="App">
  //       hello world
  //       <TestLink href="./test.html" text="test link"/>
  //     </div>
  //   )
  // }

}

export default App;
