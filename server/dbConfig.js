require("dotenv").config();
const { Pool } = require("pg");

let pool;
switch (process.env.ENVIRONMENT) {
    case "prod":
        pool = new Pool({
            connectionString: process.env.DB_CONNECTION_STRING,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
    case "dev":
        pool = new Pool({
            connectionString: process.env.DEV_DB_CONNECTION_STRING,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
    case "test":
        pool = new Pool();
        break;
    default:
        console.log("Please set ENVIRONMENT variable [test,dev,prod].");
}

module.exports = pool;
