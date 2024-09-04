# PowerShell Script for Windows

# Install nvm-windows
Write-Output "Installing nvm-windows..."
Invoke-WebRequest -Uri https://github.com/coreybutler/nvm-windows/releases/download/1.1.11/nvm-setup.exe -OutFile "$env:TEMP\nvm-setup.exe"
Start-Process -FilePath "$env:TEMP\nvm-setup.exe" -Wait

# Load nvm into the current session
$env:path += ";$env:ProgramFiles\nodejs"

# Install Node.js version 18.19
Write-Output "Installing Node.js version 18.19..."
nvm install 18.19.0

# Set Node.js version 18.19 as the default
Write-Output "Setting Node.js version 18.19 as default..."
nvm use 18.19.0
nvm alias default 18.19.0

# Install project dependencies using npm
Write-Output "Installing project dependencies..."
npm install

# Run ng serve and ng test concurrently
Write-Output "Running app and tests concurrently..."

# Start ng serve with the --open flag in the background
Start-Process -NoNewWindow -FilePath "ng" -ArgumentList "serve --open"

# Start ng test in the background
Start-Process -NoNewWindow -FilePath "ng" -ArgumentList "test"
