<H1>Autosave Systems Queueing System</H1>

<hr />

<H2>
  A dockerized CRUD application utilize microservice pattern. 
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
  <li>clone the repository</li>
  <li>cd to as-queue <code>cd as-queue</code></li>
  <li>run <code>docker compose --build --no-cache</code></li>
  <li>to activate the containers <code>docker compose up -d</code></li>
  <li>after installation run on your git bash terminal <code>./setup.sh</code> everything will install/setup including mysql db and migration</li>
</ol>

## FRONTEND
- installation
    - open gitbash
    - cd to as-queue/frontend
    - type ./frontend.sh
- for running locally / hot reload
    - npm run dev

## TEST
- open git bash
- run ./tests.sh
- runs test cases for each microservices
