"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMultipleStops_1 = require("../shared/handleMultipleStops");
const _1 = require(".");
const rangeInMiles = 1000;
async function allNearby(locationData, range) {
    const radius = 0.02 * (range || rangeInMiles);
    const url = `${_1.baseURL}/stops?api_key=${_1.apiKey}&filter[latitude]=${locationData.latitude}&filter[longitude]=${locationData.longitude}&filter[radius]=${radius}&filter[route_type]=0,1&sort=distance`;
    return JSON.stringify(await handleMultipleStops_1.handleMultipleStops(url));
}
exports.allNearby = allNearby;
