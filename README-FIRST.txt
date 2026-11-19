GRAMSUPPLY MARKETPLACE FRONTEND

This package contains the updated Amazon-inspired institutional shopping homepage.

IMPORTANT: Open the INNER frontend folder in VS Code:
  GramSupply\frontend

The correct folder contains:
  package.json
  index.html
  vite.config.js
  src\
  public\

In VS Code Terminal, make sure the prompt is inside GramSupply\frontend, then run:
  npm install
  npm run dev

The Vite server is configured for:
  http://localhost:8081

Backend API base URL is unchanged:
  http://localhost:8080/api

Do not run npm commands in the outer GramSupply folder. The package.json with the dev script is inside the frontend folder.

No node_modules folder is included. npm install creates platform-appropriate dependencies on your computer.
