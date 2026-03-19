#!/bin/bash

cd "$(dirname "$0")"
 
echo "=== WMATA App Manual Setup ==="
echo ""
 
# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Overwrite existing .env? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env file."
        exit 0
    fi
fi

cp .env.template .env
echo "✓ .env file created from template"
echo ""

read -p "Enter your WMATA API Key (press Enter to use demo key): " -r API_KEY
echo ""

if [ -z "$API_KEY" ]; then
    API_KEY="e13626d03d8e4c03ac07f95541b3091b"
    echo "Using demo API key. Note: This key has limited access and may not work reliably."
else
    echo "Using provided API key."
fi

sed -i '' "s/WMATA_API_KEY=.*/WMATA_API_KEY=$API_KEY/" .env

echo "Creating database..."
echo ""
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS wmata CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
FLUSH PRIVILEGES;
EOF
 
if [ $? -ne 0 ]; then
    echo "❌ Database setup failed!"
    echo "Make sure MySQL is running and you can connect as root."
    echo "Try: mysql -u root"
    exit 1
fi

echo ""
echo "✓ Database setup complete!"
echo "✓ .env file created"
echo ""
echo "Next steps:"
echo "  source .venv/bin/activate"
echo "  pip install -r requirements.txt"
echo "  python app.py"
