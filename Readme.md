<H1>Autosave Systems Queueing System</H1>

<hr />

<H2>
  A simple Queueing System developed by AutoSave systems inc.
</H2>

## Technologies used
- docker
- php 8
- laravel 12
- react 19
- reverb (websockets)
- laravel echo (websockets)
- redis (queue/cache manager)
- mysql DB
- qztray <code>for silent printing</code>

<hr />

<h2>Requirements</h2>
<ul>
  <li>Docker</li>
  <li>PHP 8.^</li>
  <li>Laravel 12</li>
  <li>Composer</li>
</ul>

## Sample users
- view all sample users in the asq-auth-service/database/seeders/UserSeeder
- seeders are still subject to change based on company

<h2>Installation</h2>
<ol>
  <li>First setup as server -> use this repository: <a href="https://github.com/ricolito1994/as-server">as-server></a></li>
</ol>

<ol>
  <li>clone the repository</li>
  <li>cd to as-queue <code>cd as-queue</code></li>
  <li>run <code>docker compose build --no-cache</code></li>
  <li>to activate the containers <code>docker compose up -d</code></li>
  <li>after installation run on your git bash terminal <code>./setup.sh</code> everything will install/setup including mysql db and migration</li>
</ol>

## FRONTEND
- installation
    - open gitbash
    - cd to root project folder
    - type ./frontend.sh
    - choose 1 for local/development installation / 2 for production - this will get the static ip address of the server
    - FE installation will commence.
- for running locally / hot reload
    - npm run dev
      - cd asqueue/asq-frontend
      - npm run dev
      - access thru <code>localhost:5173/asqueue</code>
 
## Development
- SSH inside container
  - either run in cli <code>docker exec -it <container_name> bash
  - or open docker desktop, go to the container/service then click the <code>Exec</code> tab
- When new api endpoints created/modified inside web.php/api.php, to apply changes <code>php artisan optimize</code> or <code>php artisan route:clear</code>

## DATABASE
- Install MySQL workbench / DB beaver or any MySQL viewer
- DB Credentials found in .env.example / .env
 
## QZ Tray
<p>This is an external application used for silent printing. Download it here https://qz.io/download/</p>

## TEST
- open git bash
- run ./tests.sh
- runs test cases for each microservices
