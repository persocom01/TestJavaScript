# react

A react testing playground.

## Installation

Install node.js.

```
npx create-react-app react-app-name

npm install jquery --save
```

npx installs a local copy of the app without having to install dependencies
globally.
react does not accept names with caps.
--save makes jquery a dependency.

## Usage

In the react app folder, the `src` folder contains the files for the react components.

### JSX

JavaScript (JS) files in react are written in a language called JSX, which is a syntax extension to JS. It is basically a merger between html and JS such that one can use html tags in a JS file without passing it as a string. The things of note about JSX are as follows:

1. Because class is a reserved keyword in JS, html tags in JSX use className instead.

2. {var} can be used to insert code into JSX html blocks much like python f-strings.

These two features are demonstrated below:

```
function helloUser(user) {
  if (user) {
    return (
      <div className="App">
        hello {user}
      </div>
    );
  }
  return (
    <div className="App">
      hello world
    </div>
  );
}
```



```
function App() {
  return (
    <div className="App">
      hello world
    </div>
  );
}
```
