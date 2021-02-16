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

The react app contains two folders:

1. The `src` folder.
This folder contains react files and supporting files like images and css. The main file here is `index.js` which uses the `App.js` component. All assets used by react during compilation should be included in this. While the default app structure does not separate react.js files from images and css, it is good practice to do so.

2. The `public` folder.
This folder contains the actual html page `index.html`. Any files not used by react but referenced by the html files in this folder should go into this folder.

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
        hello {user.name}
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