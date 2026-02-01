#!/bin/bash

echo "Setting up CARE4U Health Platform"

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "Python 3 is required but not installed. Aborting." >&2; exit 1; }

echo "✓ Node.js found: $(node --version)"
echo "✓ Python found: $(python3 --version)"

# Setup backend
echo ""
echo "Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

# Setup frontend
echo ""
echo "Setting up frontend..."
cd frontend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "Creating .env file..."
    cat > .env << EOF
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=care4u
DEBUG=true
HOST=0.0.0.0
PORT=5000
EOF
    echo "✓ .env file created. Please update with your API keys."
fi

echo ""
echo "================================="
echo "Setup complete!"
echo "================================="
echo ""
echo "To start the application:"
echo "  • Docker: docker-compose up"
echo "  • Manual: ./start-all.sh"
echo "  • Windows: start-all.bat"
echo ""
