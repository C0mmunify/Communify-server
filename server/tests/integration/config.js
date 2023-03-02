const { Pool } = require("pg");
const fs = require("fs");

const request = require("supertest");
const apiServer = require("../../app");

// Import the reset query
const reset = fs.readFileSync(__dirname + "/resetSeeds.sql").toString();

const resetTestDB = () => {
    return new Promise(async (res, rej) => {
        try {
            const db = new Pool();
            await db.query(reset);
            res("Test DB reset");
        } catch (err) {
            rej("Could not reset TestDB: " + err.message);
        }
    });
};

global.request = request;
global.app = apiServer;
global.resetTestDB = resetTestDB;
global.port = 5000;
