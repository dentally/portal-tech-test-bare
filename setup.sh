#!/bin/bash

# Install NVM (Node Version Manager)
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Load NVM into the current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js version 18.19 using NVM
echo "Installing Node.js version 18.19..."
nvm install 18.19.0

# Set Node.js version 18.19 as the default
echo "Setting Node.js version 18.19 as default..."
nvm use 18.19.0
nvm alias default 18.19.0

# Install project dependencies using npm
echo "Installing project dependencies..."
npm install

# Run ng serve with the --open flag and ng test concurrently
echo "Running app and tests concurrently..."

# Run ng serve with the --open flag in the background
ng serve --open &

# Run ng test in the background
ng test &

# Wait for both processes to complete
wait
