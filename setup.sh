#!/bin/bash

cd "$(dirname "$0")"

echo "=== WMATA App Setup ==="
echo ""

if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Overwrite existing .env? (y/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.template .env
        echo "✓ .env file created from template"
        echo ""

        read -p "Enter your WMATA API key (press Enter to use demo key): " -r API_KEY
        echo ""

        if [ -z "$API_KEY" ]; then
            API_KEY="e13626d03d8e4c03ac07f95541b3091b"
            echo "Using demo API key."
        else
            echo "Using provided API key."
        fi

        sed -i '' "s/WMATA_API_KEY=.*/WMATA_API_KEY=$API_KEY/" .env
    else
        echo "Keeping existing .env file."
    fi
else
    cp .env.template .env
    echo "✓ .env file created from template"
fi

echo ""
docker compose build
docker compose run expo npm install
docker compose up -d

echo ""
echo "✓ Setup complete!"
echo "Navigate to http://localhost:8081"
echo "API available at http://localhost:5001"