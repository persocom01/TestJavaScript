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

1. Because `class` is a reserved keyword in JS, html tags in JSX use `className` instead.

2. Because `for` is a reserved keyword in JS, html tags in JSX use `htmlFor` instead.

3. html `onclick` is camel case `onClick` instead.

4. To make input checkboxes checked by default, instead of using the `checked` property, use `defaultChecked={true}`

5. `{var}` can be used to insert variables into JSX html blocks much like python f-strings.

6. `event.preventDefault()` must be called to prevent default browser behavior instead of `return false`.

These features are demonstrated below:

```
function CheckedBox() {
  const handleClick = e => {
    e.preventDefault()
    console.log('I was clicked!')
  }
  return (
    <input type="checkbox" name="example-checkbox" onClick={handleClick} defaultChecked={true} />
    <label htmlFor="tableview-checkbox">
      Checked by default
    </label>
  );
}
```

### Commands

In windows, to run the dev server in https mode, enter:

```
set HTTPS=true&&npm start
```
