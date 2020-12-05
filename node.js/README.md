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

```
express -v pug webapp_folder
```

-v determines the html templating engine that will be used. The most common are pug, mustache and ejs. This affects how you write the html files in the website. pug is said to be easiest to write, but ejs is the most easily adapted to/from actual html. The webapp will be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

```
cd webapp_folder
npm install
<!-- cmd -->
SET DEBUG=webapp:* & npm start
<!-- powershell -->
SET DEBUG=webapp:*; npm start
<!-- bash -->
DEBUG=webapp:* npm start
```

`SET DEBUG` allows you to see what requests are being sent to the server, otherwise `npm start` is sufficient. The name `webapp` comes from the name property of `package.json` npm install creates. Access the webapp by going to the browser and entering the following into the address bar:

```
http://localhost:3000/
http://127.0.0.1:3000/
```

If cmd was used to start the server, ctrl+c will end the service. If git bash was used, use the task manager and kill all node.js processes.

### AWS

1. Spin up an Ubuntu 18.04 AWS EC2 instance and configure it to accept SSH, HTTP (port 80), HTTPS (port 443), node.js(port 3000) and flask (port 5000) connections from anywhere.

2. Download the .pem key.

3. git bash (install on computer if not already present) in the folder with the key and type:

```
chmod 400 keyname.pem
```

which gives the user permission to read the file (4) and no permissions (0) to the group and everyone else.

4. Connect to the aws instance using the following command:

```
ssh -i keyname.pem ubuntu@aws_instance_public_dns
```

To remove the added ip from the known hosts list, use:

```
ssh-keygen -R server_ip_address
```

To end the connection, enter:

```
exit
```

5. Install node.js

Instructions found here: https://github.com/nvm-sh/nvm

Enter the following code while connected to aws:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

node -e "console.log('Running Node.js ' + process.version)"
```

The last line of code tests if node.js is running and returns the node.js version.

6. Install express-generator

```
npm install express-generator -g
```

Express generator is based on the express framework and provides a boilerplate folder structure for a new webapp.

7. Create webapp

```
express -v pug webapp_folder
```

-v determines the html templating engine that will be used. The most common are pug, mustache and ejs. This affects how you write the html files in the website. pug is said to be easiest to write, but ejs is the most easily adapted to/from actual html. The webapp will be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

```
cd webapp_folder
npm install
DEBUG=webapp_folder:* && npm start
```

SET DEBUG allows you to see what requests are being sent to the server. Access it by going to the browser and entering the following into the address bar:

```
http://localhost:3000/
http://127.0.0.1:3000/
```

## Usage

### File locations

The webapp assumes that the html file is run from the public folder of the webapp. This means the default paths for images, javascript and css are:

```
./images/
./javascripts/
./stylesheets/
```

Which have to be noted when converting html to ejs.

### Routing

By default the webapp is built with a ready made index page. To add new pages, 3 things are needed:
1. The page itself in the `views` folder.
The page should have the correct extension for its templating engine, such as `page.ejs`.
2. A routing file for the page in the `routes` folder.
More detail on how this works in the file itself.
3. The following entries in the `app.js` file.

```
<!-- Initializes the file in the routes folder -->
var pageRouter = require('./routes/page');
<!-- Sets the url that triggers the route file. -->
app.use('/page', pageRouter);
```

## Adding node.js modules

Any modules used in the app need to be defined under dependencies in package.json, which looks something like this:

```
{
  "name": "webapp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```

### Useful modules

* "multer": "~1.4.2" - for form enctype="multipart/form-data".
* "axios": "~0.19.2" - the node version of the python requests module.
* "mariadb": "~2.4.2"
