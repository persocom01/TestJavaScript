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
    // <React.Fragment></React.Fragment>
    // instead, or its short hand:
    // <></>
    <div>
      {/* Commenting within html tags in JSX must be done this way.*/}
      <a href={props.href}>{props.text}</a>
    </div>
    <div>
    </div>
  )
}

function App(user) {
  if (user.name) {
    return (
      <div className="App">
        hello {user.name}
        {/* The main function can reference other functions in the same file.*/}
        <TestLink href="./test.html" text="test link"/>
      </div>

    );
  }
  return (
    <div className="App">
      hello world
      <TestLink href="./test.html" text="test link"/>
    </div>
  );
}

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         hello world
//         <TestLink href="./test.html" text="test link"/>
//       </div>
//     )
//   }
// }


export default App;
