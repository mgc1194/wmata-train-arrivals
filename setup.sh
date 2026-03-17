#!/bin/bash

cd "$(dirname "$0")"
 
echo "=== WMATA App Database Setup ==="
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
 
echo "Creating database..."
echo ""
 
# Run setup SQL
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
 
# Create .env file
cat > .env << EOF
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=wmata
DB_USER=root
DB_PASSWORD=
 
FLASK_DEBUG=True
FLASK_PORT=5001
 
WMATA_API_KEY=your_wmata_api_key_here
EOF
 
echo ""
echo "✓ Database setup complete!"
echo "✓ .env file created"
echo ""
echo "Next steps:"
echo "  source .venv/bin/activate"
echo "  pip install -r requirements.txt"
echo "  python app.py"
