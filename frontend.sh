#!/bin/bash

set -e

echo "Choose build environment: ";

echo "[1] local";
echo "[2] production";
echo "[3] exit";

read choice;

ENV_SRC=""
myip=""

case $choice in
    1)
    myip="localhost"
    ENV_SRC=".env.example"
    ;;
    2)
    myip=$(ipconfig | grep -i "IPv4" | head -n 1 | awk '{print $NF}')
    ENV_SRC=".env.prod.example"
    ;;
    3)
    echo "Exiting..."
    exit 0
    ;;
    *)
    echo "Invalid choice"
    exit 1
    ;;
esac



FRONTENDDIR="./asq-frontend"

ENVFILE="$FRONTENDDIR/.env"

ENVEXAMPLEFILE="$FRONTENDDIR/$ENV_SRC"

# check if .env.example is present within the frontend

echo "INITIALIZING ENV ... "

# put delay

sleep 2

# if [[ ! -f "$ENVFILE" ]]; then

    if [[ -f "$ENVEXAMPLEFILE" ]]; then
        echo "Creating .env from $ENVEXAMPLEFILE ...."
        
        cp $ENVEXAMPLEFILE $FRONTENDDIR/.env
    else
        echo "$ENVEXAMPLEFILE not found!"
        exit 1
    fi
    sleep 2
# fi

echo 'Plotting urls to .env ...'

sed -i "s|VITE_APP_BASE_URL=.*|VITE_APP_BASE_URL=http://$myip/api|g" $ENVFILE

sed -i "s|VITE_APP_REVERB_HOST=.*|VITE_APP_REVERB_HOST=$myip|g" $ENVFILE

echo "INSTALLING NODE PACKAGES ... "

cd "$FRONTENDDIR"

npm install

echo "DONE INSTALLING PACKAGES"

sleep 1

echo "BUILDING PROJECT ..."

npm run build

echo "DONE BUILDING!"
echo "--------------------------"
echo "front end can be accessed using http://localhost or http://$myip"