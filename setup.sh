#!/bin/sh

set -e

# be sure to install docker
# run this after installation
# add additional setup for each microservice

SERVICES="
as-queue-asq-auth-service-1
as-queue-asq-queue-service-1
as-queue-asq-gate-service-1
as-queue-asq-notif-service-1
"

# generate a JWT secret hash value for all services
SHARED_JWT_SECRET=$(openssl rand -base64 48)

for SERVICE in $SERVICES
do
  echo "------------------------------"
  echo "Permissions for $SERVICE"
  echo "------------------------------"

  docker exec $SERVICE sh -c "chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache"

  echo "Generate .env files in $SERVICE"

  if ! docker exec $SERVICE sh -c "[ -f .env ]"; then
    if ! docker exec $SERVICE sh -c "[ -f .env.example ]"; then
      echo "No .env.example found in $SERVICE."
      exit 1;
    fi

    docker exec $SERVICE cp .env.example .env
  fi

  # if docker exec $SERVICE sh -c "[ -f .env ]"; then
  #  export $(docker exec $SERVICE sh -c "$(grep -v '^#' .env | xargs)")
  # else
  #  echo "No .env file found !"
  #  exit 1
  # fi

  # JWT should be enabled/installed in each service
  # SHARE the generated JWT secret to each service

  echo "Synching JWT secret to each services ... "
  
  if ! docker exec $SERVICE grep -q "JWT_SECRET=" .env; then
    docker exec $SERVICE sh -c "echo JWT_SECRET=$SHARED_JWT_SECRET >> .env"
  else
    docker exec $SERVICE sh -c "sed -i 's|JWT_SECRET=.*|JWT_SECRET=$SHARED_JWT_SECRET|g' .env"
  fi

  echo "Synch complete .."

  DB_DATABASE=$(docker exec $SERVICE grep "^DB_DATABASE=" //var/www/html/.env | cut -d '=' -f2 | tr -d '\r')
  DB_HOST=$(docker exec $SERVICE grep "^DB_HOST=" //var/www/html/.env | cut -d '=' -f2 | tr -d '\r')
  DB_PORT=$(docker exec $SERVICE grep "^DB_PORT=" //var/www/html/.env | cut -d '=' -f2 | tr -d '\r')

  echo "------------------------------"
  echo "Testing DB connection for $SERVICE $DB_DATABASE:$DB_PORT"
  echo "------------------------------"

  MAXTRIES=3
  NUMTRIES=0

  until docker exec $SERVICE sh -c "nc -z '$DB_HOST' '$DB_PORT'"; do
    NUMTRIES=$(NUMTRIES+1)

    if [ "$NUMTRIES" -ge "$MAXTRIES" ]; then
      echo "Cannot connect to db $DB_DATABASE ..."
      exit 1;
    fi

    echo "Connecting to $DB_DATABASE ... $NUMTRIES/$MAXTRIES retrying for 3s."
    sleep 3
  done

  docker exec $SERVICE php artisan route:clear
  docker exec $SERVICE php artisan cache:clear

  echo "Generating key for $SERVICE"

  docker exec $SERVICE php artisan key:generate

  echo "DB connection OK for $SERVICE"

  echo "Running migrations..."
  docker exec $SERVICE php artisan migrate:fresh #should only run in local environment!
  # docker exec $SERVICE php artisan migrate --force

  echo "Running seeders..."
  docker exec $SERVICE php artisan db:seed

  echo "Optimize services..."
  docker exec $SERVICE php artisan optimize
  
done

echo "All services migrated successfully."