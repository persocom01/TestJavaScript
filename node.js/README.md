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

-v determines the html templating engine that will be used. The most common are pug, mustache and ejs. The webapp will then be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

```
cd webapp_folder
npm install
SET DEBUG=webapp_folder:* $ npm start
```

SET DEBUG allows you to see what requests are being sent to the server. Access it by going to the browser and entering the following into the address bar:

```
http://localhost:3000/
http://127.0.0.1:3000/
```

### AWS

1. Spin up an Ubuntu 18.04 AWS EC2 instance and configure it to accept SSH, HTTP (port 80), and HTTPS (port 443) connections from anywhere.

2. Download the .pem key.

3. git bash (install on computer if not already present) in the folder with the key and type:

```
chmod 400 keyname.pem
```

which gives the user permission to read the file (4) and no permissions (0) to the group and everyone else.

4. Connect to the aws instance using the following command:

```
ssh -i keyname.pem ubuntue@aws_instance_public_dns
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

-v determines the html templating engine that will be used. The most common are pug, mustache and ejs. The webapp will then be setup in the folder. To run it, enter the following commands to navigate to the folder start the webserver:

```
cd webapp_folder
npm install
SET DEBUG=webapp_folder:* $ npm start
```

SET DEBUG allows you to see what requests are being sent to the server. Access it by going to the browser and entering the following into the address bar:

```
http://localhost:3000/
http://127.0.0.1:3000/
```
