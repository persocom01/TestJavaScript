# TestJavaScript

A JavaScript testing playground based on two sources:
https://www.tutorialspoint.com/javascript/index.htm
https://developer.mozilla.org/en-US/docs/Learn/JavaScript

Workable code is written on each topic to demonstrate use of JavaScript in the topic area. The code written is generally meant to work in node.js as a side effect of it being easy to run as a script in atom.

## Installation

Javascript can be run on any modern browser. However, some of the code requires the html file to be opened on a server. For this purpose, the atom package atom-live-server was used to simulate a local server. node.js has to be installed to enable atom to run scripts. Atom was used as text editor.

* [node.js 10.16.0](https://nodejs.org/en/)
* [atom 1.40.1](https://atom.io/)

### Atom packages used:

* autocomplete-paths
* docblockr
* emmet
* javascript-snippets
* linter-js-standard
* atom-live-server

### General packages:

* atom-beautify
* busy-signal
* file-icons
* intentions
* minimap
* open_in_cmd
* project-manager
* script

## Updating

JavaScript itself probably does not need to be manually updated. Sometimes, errors are the result of an old version of nvm rather than node. To up npm, enter:

```
npm install npm@latest -g
```

To update node.js:
* windows - download and use the installers from https://nodejs.org/en/download
* linux - use nvm to update node:

1. Install nvm

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
<!-- alternatively, -->
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

2. Ensure nvm is installed

```
nvm -v
```

3. Check the node version installed

```
node -v
```

4. List and install the version of node you want

```
<!-- List all versions of node -->
nvm ls
nvm install version_number
```

5. Activate the node version you want

```
nvm use version_number
```
