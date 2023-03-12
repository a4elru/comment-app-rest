'use strict';

const authBasic = require('../middleware/auth-basic');
const express = require('express');
const router0 = express.Router();
const sqlite3 = require('sqlite3').verbose();
const queries = require('../database/sql-queries');
const params = require('../params');

const db = new sqlite3.Database('./database/database.db');
db_createTableINE_comments();

async function db_createTableINE_comments(){
    function executor(resolve, reject) {
        let statement = db.prepare(queries.createTableINE_comments);
        statement.run((error) => {
            if (error === null) {
                resolve([null]);
            } else {
                reject([error]);
            }
        });
        statement.finalize();
    }
    return await new Promise(executor);
}
async function db_dropTableIE_comments(){
    function executor(resolve, reject) {
        let statement = db.prepare(queries.dropTableIE_comments);
        statement.run((error) => {
            if (error === null) {
                resolve([null]);
            } else {
                reject([error]);
            }
        });
        statement.finalize();
    }
    return await new Promise(executor);
}

async function db_insert_comment(username, text){
    function executor(resolve, reject) {
        let params = [Date.now(), username, text];
        let statement = db.prepare(queries.insert_comment, params);
        statement.run((error) => {
            if (error === null) {
                resolve([null]);
            } else {
                reject([error]);
            }
        });
        statement.finalize();
    }
    return await new Promise(executor);
}

async function db_get_comment(id){
    function executor(resolve, reject) {
        let params = [id];
        let statement = db.prepare(queries.get_comment, params);
        statement.get((error, row) => {
            if (error === null) {
                resolve([null, row]);
            } else {
                reject([error, row]);
            }
        });
        statement.finalize();
    }
    return await new Promise(executor);
}
async function db_get_comments(){
    function executor(resolve, reject) {
        let statement = db.prepare(queries.get_comments);
        statement.all((error, rows) => {
            if (error === null) {
                resolve([null, rows]);
            } else {
                reject([error, rows]);
            }
        });
        statement.finalize();
    }
    return await new Promise(executor);
}

router0.post('/', async function(request, response) {
    let username = request.body.username;
    let text = request.body.text;
    if (username === undefined || text === undefined) {
        response.envelope(400);
        return;
    }
    let [error] = await db_insert_comment(username, text);
    if (error !== null) {
        response.envelope(500);
        return;
    }
    response.envelope(200);
    
    if (params.ADD_TELEGRAM_LISTENER) {
        // send saved comment to me throught telegram bot
        const secret_params = require('../secret-params');
        const token = secret_params.TELEGRAM_BOT_TOKEN;
        const user_id = secret_params.USER_ID;
        const axios = require('axios');
        const data = JSON.stringify({
            "chat_id": user_id,
            "text": `${username}: ${text}`
        });
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.telegram.org/bot${token}/sendMessage`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

if (params.ADD_AUTH_BASIC) {
    router0.use(authBasic());
}

router0.get('/', async function(request, response) {
    let [error, rows] = await db_get_comments();
    if (error !== null) {
        response.envelope(500);
        return;
    }
    if (rows === undefined) {
        response.envelope(404);
        return;
    }
    response.envelope(200, rows);
});

router0.get(/^\/\d+$/, async function(request, response) {
    let id = Number(request.path.slice(1));
    let [error, row] = await db_get_comment(id);
    if (error !== null) {
        response.envelope(500);
        return;
    }
    if (row === undefined) {
        response.envelope(404);
        return;
    }
    response.envelope(200, row);
});

module.exports = router0;