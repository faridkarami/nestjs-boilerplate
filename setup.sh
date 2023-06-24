#!/bin/bash

# STDERR log function
err() {
  echo -e "\n[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@\n" >&2
  exit 1
}

# STDOUT log function
log() {
  echo -e "\n[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@\n"
}

# Check if Docker is installed
if ! type "docker" >/dev/null 2>&1; then
  err "⛔️ Docker not installed"
fi

log "🚀 Starting docker compose"
docker compose up -d
if [ $? -ne 0 ]; then
    err "Error while starting docker compose."
fi

# Database

log "✅ Clean migration"
docker exec -it webservice-api-1 rm -rf ./src/database/migrations/*.*
if [ $? -ne 0 ]; then
  err "⛔️ Cleaning failed."
fi

log "✅ Generate migrations: npm run migration:generate"
docker exec -it webservice-api-1 npm run migration:generate
if [ $? -ne 0 ]; then
  err "⛔️ Migrations failed."
fi

log "✅ Run migrations: npm run migration:run"
docker exec -it webservice-api-1 npm run migration:run
if [ $? -ne 0 ]; then
  err "⛔️ Migrations failed."
fi

log "✅ Run seeds: npm run seed:run"
docker exec -it webservice-api-1 npm run seed:run
if [ $? -ne 0 ]; then
  err "⛔️ Seeds failed."
fi
