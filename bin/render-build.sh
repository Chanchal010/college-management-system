#!/usr/bin/env bash
# exit on error
set -o errexit

# Install python dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Collect static files (don't fail if there are issues)
python manage.py collectstatic --no-input || echo "Static collection failed, but continuing deployment" 