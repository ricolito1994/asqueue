#!/bin/bash

set -e

FRONTENDDIR="./asq-frontend"

ENVFILE="$FRONTENDDIR/.env"

# check if .env.example is present within the frontend

echo "INITIALIZING ENV ... "

# put delay

sleep 2

if [[ ! -f "$ENVFILE" ]]; then

    ENVEXAMPLEFILE="$FRONTENDDIR/.env.example"

    if [[ -f "$ENVEXAMPLEFILE" ]]; then
        echo "Creating .env from .env.example ...."
        
        cp $FRONTENDDIR/.env.example $FRONTENDDIR/.env
    else
        echo ".env.example not found!"
        exit 1
    fi
    sleep 2
fi

echo "INSTALLING NODE PACKAGES ... "

cd "$FRONTENDDIR"

npm install

echo "DONE INSTALLING PACKAGES"

sleep 1

echo "BUILDING PROJECT ..."

npm run build

echo "DONE BUILDING!"
echo "--------------------------"
echo "front end can be accessed using http://localhost"