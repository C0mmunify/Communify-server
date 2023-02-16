# Communify Server

<!-- badges -->

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/mit-license.php)
[![GitHub latest commit](https://img.shields.io/github/last-commit/C0mmunify/Communify-server.svg)](https://github.com/C0mmunify/Communify-server)
[![GitHub forks](https://img.shields.io/github/forks/C0mmunify/Communify-server.svg)](https://github.com/C0mmunify/Communify-server)

Welcome to the server repository for the Communify App!

## Table of Contents

-   [Installation & Usage](#installation--usage)
-   [Technologies](#technologies)
-   [Database Schema](#database-schema)
-   [Routes](#routes)

# Installation

-   Clone the repo
-   Navigate to the `/Communify-server/server` folder
-   Run `npm i` to install dependencies
-   Navigate back to the `/Communify-server` folder to run bash scripts

# Local Usage

Before running any scripts you must create a `.env` file within the `server` directory. In this file you must store the following:

-   `HMAC_SECRET=<Ask a collaborator>`

`bash _scripts/start.sh`

-   Starts api & db services
-   Runs db migrations
-   Seeds db for development
-   Serves api on `localhost:3003`

Note: Press `Ctrl` + `C` to terminate the docker container

`bash _scripts/stop.sh`

-   Stops all running services

`bash _scripts/teardown.sh`

-   Stops all running services
-   Removes containers
-   Removes volumes

# Technologies

# Database Schema

Database URL: https://console.neon.tech/app/projects/late-meadow-436645

# Routes
