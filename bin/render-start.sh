#!/usr/bin/env bash
# This file is automatically used by Render for deployment

# Set default port if not defined
PORT=${PORT:-8000}

# Print information for debugging
echo "Starting gunicorn on port: $PORT"

# Start gunicorn
exec gunicorn college_management_system.wsgi:application --bind 0.0.0.0:$PORT 