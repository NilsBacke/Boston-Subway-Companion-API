"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const executeCall_1 = require("./executeCall");
const stop_1 = require("../models/stop");
exports.handleMultipleStops = async (url, method = 'GET') => {
    const json = await executeCall_1.executeCall(url, method);
    console.log(json);
    // TODO: handle error of json
    const data = json.data;
    if (!data || data.length === 0) {
        return [];
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(stop_1.makeStop(data[i]));
    }
    return result;
};
