# TestJavaScript

A JavaScript testing playground based on two sources:
https://www.tutorialspoint.com/javascript/index.htm
https://developer.mozilla.org/en-US/docs/Learn/JavaScript

Workable code is written on each topic to demonstrate use of JavaScript in the topic area. The code written is generally meant to work in node.js as a side effect of it being easy to run as a script in atom.

## Installation

Javascript can be run on any modern browser. However, some of the code requires the html file to be opened on a server. For that purpose, WinNMP was used to create a local server, and the necessary files put inside the server's project folder. Atom was used as text editor. As an alternative to WinNMP, the atom package atom-live-server can also be used to run a local server. node.js has to be installed to enable atom to run scripts.

* [WinNMP 20.01](https://winnmp.wtriple.com/)
* [node.js 10.16.0](https://nodejs.org/en/)
* [atom 1.40.1](https://atom.io/)

Once the local server is running, access the file by opening the browser and typing:

```
http://127.0.0.1/project_name/file_name
```

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
