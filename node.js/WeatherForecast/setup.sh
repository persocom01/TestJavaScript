#!/bin/bash
cd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
npm install pm2 -g

sudo apt update
sudo apt -y install python3-pip
pip3 install pandas
pip3 install sqlalchemy
pip3 install pymysql
pip3 install sklearn
pip3 install requests
pip3 install flask-restful
sudo apt-get install gunicorn3

cd inp-one-dil-virtual-lab/WeatherForecast/webapp
npm install
pm2 -n webapp start npm -- start
cd ..
cd flaskapp
gunicorn3 -b 0.0.0.0:5000 -w 4 api:app --timeout 180 --daemon
