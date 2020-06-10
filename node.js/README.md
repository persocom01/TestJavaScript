# node.js

A node.js testing playground demonstrating a node.js webapp.

## Installation

### Desktop

1. Install node.js

Download and install from: https://nodejs.org/en/download/

2. Install express-generator

Open cmd and enter:

```
npm install express-generator -g
```

Express generator is based on the express framework and provides a boilerplate folder structure for a new webapp.

3. Create webapp

Enter:

```
express -v pug webapp_folder
```

-v determines the html templating engine that will be used. The most common are pug, mustache and ejs. The webapp will then be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

```
cd webapp_folder
npm install
SET DEBUG=webapp_folder:* $ npm start
```

SET DEBUG allows you to see what requests are being sent to the server. Access it by going to the browser and entering the following into the address bar:

```
localhost:3000
```

### AWS

1. Install node.js

Instructions found here: https://github.com/nvm-sh/nvm



Javascript can be run on any modern browser. However, some of the code requires the html file to be opened on a server. For that purpose, WinNMP was used to create a local virtual server, and the necessary files put inside the server's project folder. Atom was used as text editor. node.js has to be installed to enable atom to run scripts.

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

### General packages:

* atom-beautify
* busy-signal
* file-icons
* intentions
* minimap
* open_in_cmd
* project-manager
* script
