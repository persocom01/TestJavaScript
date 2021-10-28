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

-v determines the html templating engine that will be used. The most common are `pug`, `mustache` and `ejs`. This affects how you write the html files in the website. `pug` is said to be easiest to write, but `ejs` is the most easily adapted to/from actual html. The webapp will be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

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

-v determines the html templating engine that will be used. The most common are `pug`, `mustache` and `ejs`. This affects how you write the html files in the website. `pug` is said to be easiest to write, but `ejs` is the most easily adapted to/from actual html. The webapp will be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

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

### Changing port

Changing the server port may be done in two ways:

1. Changing the default port in `bin/www.js`

By default, the `npm start` command runs `bin/www.js` during startup. To change the default port, open the file and change the following line:

```
var port = normalizePort(process.env.PORT || '3000');
```

Change 3000 to the desired port. To change the startup script or stop using it altogether, open `package.json` and change the following line:

```
  "scripts": {
    "start": "node ./bin/www"
  },
```

Change the value of `start` to your desired script path. If start is not specified, node runs `server.js` by default.

2. Changing the PORT environmental variable when starting the server

The port node listens to may be changed at startup by running:

```
set PORT=desired_port && npm start
```

This is because by default, `bin/www.js` checks `process.env.PORT` for a value before using default settings. When choosing to set your own default port in code, remember to use the same code if you want to be able to set the port duting server startup as well.

### https

To add https functionality, two things are needed:

1. An SSL certificate

We will use `openssl` to generate an SSL certificate. Download and install the appropriate installer here: https://slproweb.com/products/Win32OpenSSL.html

After installation, add the path to `openssl.exe` to windows environmental variables. For windows this is normally `C:\Program Files\OpenSSL-Win64\bin`

For production purposes, we would need to generate a private key as well as a Certificate Signing Request (CSR) that needs to be submitted to a trusted certificate authority to be validated to receive a certificate. To do this we would enter the following command:

```
openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
```

For development purposes, a self signed SSL certificate is sufficient, which we can produce using the following command instead:

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 9999 -keyout key.pem -out cert.pem
```

`-newkey rsa:2048` - generates a 2048 bit private key.
`-x509` - outputs a x509 structure instead of a certificate signing request.
`-days 9999` - sets the validity of the key to 9999 days.

Copy and paste the output, `cert.pem` and `key.pem` to the app folder if they are not already in it.

2. Start the https server in the code

By default, express stores server code in `bin/www.js`. However, one can still add code to `app.js` without issue. Note, however, that by leaving the defaults in `bin/www.js`, node will still start a http server in port 3000. Thus to only use a https server, either change `bin/www.js` or change the start script value of `npm start`. Below is boilerplate code for starting a https server:

```
var https = require('https');
var fs = require('fs');

var port = (process.env.PORT || '3000');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var server = https.createServer(options, app);
server.listen(port);
```

In order to see the new app, navigate to https://localhost:3000 or whatever port you set the server to runs on on a web browser. Note that by default, browsers may not use https, so typing `localhost:3000` may return a page not found error.

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

* "multer": "~1.4.3" - for form enctype="multipart/form-data".
* "axios": "~0.19.2" - the node version of the python requests module.
* "mariadb": "~2.4.2"
* "xss-clean": "0.1.1" - sanitizes user input of cross-site scripting attacks.

## Updating

Sometimes, errors are the result of an old version of nvm rather than node. To update npm, enter:

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
