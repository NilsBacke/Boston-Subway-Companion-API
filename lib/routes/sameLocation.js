"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMultipleStops_1 = require("../shared/handleMultipleStops");
const _1 = require(".");
async function stopsAtSameLocation(givenStop) {
    const url = `${_1.baseURL}/stops?api_key=${_1.apiKey}&filter[latitude]=${givenStop.latitude}&filter[longitude]=${givenStop.longitude}&filter[radius]=0.001&filter[route_type]=0,1&sort=distance`;
    const stops = await handleMultipleStops_1.handleMultipleStops(url, 'GET');
    // filter stops
    for (let i = 0; i < stops.length; i++) {
        if (stops[i].name !== givenStop.name) {
            stops.splice(i, i);
            i--;
        }
    }
    stops.sort((stop1, stop2) => stop1.lineName.localeCompare(stop2.lineName));
    // assert(stops.length == 1 || stops.length == 2 || stops.length == 4) // TODO: figure out what to do with this
    return JSON.stringify(stops);
}
exports.stopsAtSameLocation = stopsAtSameLocation;
