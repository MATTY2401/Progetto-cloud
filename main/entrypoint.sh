#!/bin/sh
# entrypoint.sh

# Run migrations
npx knex --knexfile ./db/knexfile.js migrate:latest

# Run the main container command
exec "$@"