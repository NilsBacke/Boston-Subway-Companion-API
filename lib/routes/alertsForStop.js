"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const executeCall_1 = require("../shared/executeCall");
const alert_1 = require("../models/alert");
async function alertsForStop(stopId) {
    const url = `${_1.baseURL}/alerts?api_key=${_1.apiKey}&filter[stop]=${stopId}`;
    const json = await executeCall_1.executeCall(url);
    console.log(json);
    // TODO: handle error of json
    const data = json.data;
    let result = [];
    if (!data || data.length === 0) {
        result = [];
    }
    for (let i = 0; i < data.length; i++) {
        result.push(alert_1.makeAlert(data[i], stopId));
    }
    return JSON.stringify(result);
}
exports.alertsForStop = alertsForStop;
