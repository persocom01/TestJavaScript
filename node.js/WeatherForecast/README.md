# inp-one-dil-virtual-lab

## Installation

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

5. Copy project folder into aws using the following code:

```
scp -i pem_key_path -r project_folder_path ubuntu@ec2_public_dns:~/
```

6. Connect to aws and run setup.sh inside the project folder:

```
cd project_folder
chmod 774 ./setup.sh
./setup.sh
```

Note that a bash .sh will contain bad character ^M if written in windows. To prevent this, write the file in git bash by entering:

```
vim -b setup.sh
```

Press i for insert, :w to save and :q to quit.

## Stopping service

You may stop services on the server by entering:

```
pm2 delete 0
pkill gunicorn
```
