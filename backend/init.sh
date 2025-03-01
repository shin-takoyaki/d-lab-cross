#!/bin/sh

# Flaskアプリケーションのコンテキストを設定
export FLASK_APP=run.py

echo "Running database migrations..."
flask db migrate -m "Initial migration"
if [ $? -ne 0 ]; then
    echo "Migration creation failed"
    exit 1
fi

echo "Upgrading database..."
flask db upgrade
if [ $? -ne 0 ]; then
    echo "Database upgrade failed"
    exit 1
fi

echo "Starting application..."
python run.py 