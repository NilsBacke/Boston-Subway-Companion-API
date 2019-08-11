"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const handleMultipleStops_1 = require("../shared/handleMultipleStops");
const rangeInMiles = 100;
async function nearest(locationData) {
    const radius = 0.02 * rangeInMiles;
    const url = `${_1.baseURL}/stops?api_key=${_1.apiKey}&filter[latitude]=${locationData.latitude}&filter[longitude]=${locationData.longitude}&filter[radius]=${radius}&filter[route_type]=0,1&sort=distance&page[limit]=2`;
    const response = JSON.stringify(await handleMultipleStops_1.handleMultipleStops(url));
    console.log(response);
    return response;
}
exports.nearest = nearest;
