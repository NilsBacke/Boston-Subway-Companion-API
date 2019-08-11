"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
async function executeCall(url, method = 'GET') {
    const response = await fetch(url, {
        method: method
    });
    const json = await response.json();
    // console.log(JSON.stringify(json))
    return json;
}
exports.executeCall = executeCall;
