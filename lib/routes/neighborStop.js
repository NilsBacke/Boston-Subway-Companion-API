"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const executeCall_1 = require("../shared/executeCall");
const stop_1 = require("../models/stop");
async function neighborStop(stopId) {
    const stopIdNum = Number(stopId);
    const url = `${_1.baseURL}/stops?api_key=${_1.apiKey}&filter[route_type]=1&filter[id]=${stopIdNum},${stopIdNum -
        1},${stopIdNum + 1}`;
    // stopID, stopID - 1, stopID + 1
    const json = await executeCall_1.executeCall(url);
    console.log(json);
    // TODO: handle error of json
    const data = json.data;
    const nameToMatch = data[0].attributes.name;
    for (var i = 1; i < data.length; i++) {
        if (nameToMatch === data[i].attributes.name) {
            return JSON.stringify(stop_1.makeStop(data[i]));
        }
    }
    return JSON.stringify(stop_1.makeStop(data[0]));
}
exports.neighborStop = neighborStop;
