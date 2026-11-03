#!/bin/sh
set -e

# Run from the folder containing docker-compose.yml, after `docker compose up -d`
# Seed only when asked:  SEED=true ./setup.sh

SERVICES=$(docker ps -a --format "{{.Names}}" | grep 'asq-' | grep -E '^as-?queue-')
SEED=${SEED:-true}

run()     { docker exec "$1" sh -c "$2"; }

# RUN docker command with www-data as user
run_www() { docker exec -u www-data "$1" sh -c "$2"; }

# Reuse an existing JWT secret if any service already has one
SHARED_JWT_SECRET=""
for S in $SERVICES; do
  V=$(run "$S" "grep '^JWT_SECRET=' .env 2>/dev/null | cut -d= -f2-" | tr -d '\r' || true)
  if [ -n "$V" ]; then SHARED_JWT_SECRET="$V"; break; fi
done
if [ -z "$SHARED_JWT_SECRET" ]; then
  SHARED_JWT_SECRET=$(openssl rand -base64 48 | tr -d '\n')
  echo "Generated new JWT secret"
fi

for S in $SERVICES; do
  echo "------------------------------"
  echo "Setting up $S"
  echo "------------------------------"

  run "$S" "[ -f .env ] || cp .env.example .env"
  run "$S" "chown -R www-data:www-data storage bootstrap/cache"

  # Composer only exists in the dev image
  if run "$S" "command -v composer >/dev/null 2>&1"; then
    run "$S" "composer install --no-interaction"
  fi

  # Same JWT secret everywhere (sets it, or keeps it in sync)
  if run "$S" "grep -q '^JWT_SECRET=' .env"; then
    run "$S" "sed -i 's|^JWT_SECRET=.*|JWT_SECRET=$SHARED_JWT_SECRET|' .env"
  else
    run "$S" "printf '\nJWT_SECRET=%s\n' '$SHARED_JWT_SECRET' >> .env"
  fi

  # Only generate APP_KEY if it's missing
  if ! run "$S" "grep -q '^APP_KEY=base64:' .env"; then
    echo "Generating APP_KEY"
    run "$S" "php artisan key:generate --force"
  fi

  # Wait until MySQL actually accepts logins (up to ~60s)
  TRIES=0
  until run_www "$S" "php artisan db:show >/dev/null 2>&1"; do
    TRIES=$((TRIES+1))
    if [ "$TRIES" -ge 20 ]; then
      echo "Cannot connect to the database for $S. Check DB_* in its .env"
      exit 1
    fi
    echo "Waiting for database... $TRIES/20"
    sleep 3
  done

  run_www "$S" "php artisan migrate --force"

  if [ "$SEED" = "true" ]; then
    run_www "$S" "php artisan db:seed --force"
  fi

  # Cache in prod; keep uncached in local so .env edits show up
  APP_ENV=$(run "$S" "grep '^APP_ENV=' .env | cut -d= -f2" | tr -d '\r')
  if [ "$APP_ENV" = "local" ]; then
    run_www "$S" "php artisan optimize:clear"
  else
    run_www "$S" "php artisan optimize"
  fi
done

echo "Restarting services..."
docker restart $SERVICES

echo "All services set up."