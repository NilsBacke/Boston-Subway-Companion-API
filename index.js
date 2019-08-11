"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packagejson = require('./package.json');
const routes_1 = require("./lib/routes");
console.log('loaded ' + packagejson.name + ', version ' + packagejson.version);
exports.handler = async function (event, context) {
    if (!event.path) {
        return { statusCode: 404, body: '' };
    }
    if (event.path.includes('/stops/nearest')) {
        const error = handleLocationParams(event);
        if (error) {
            return error;
        }
        const list = await routes_1.nearest(event.queryStringParameters);
        return { statusCode: 200, body: list };
    }
    if (event.path.includes('/stops/allnearby')) {
        const error = handleLocationParams(event);
        if (error) {
            return error;
        }
        const list = await routes_1.allNearby(event.queryStringParameters, Number(event.queryStringParameters.range));
        return { statusCode: 200, body: list };
    }
    if (event.path.includes('/stops/location')) {
        if (!event.body) {
            return {
                statusCode: 400,
                body: 'No stop provided in request body'
            };
        }
        const list = await routes_1.stopsAtSameLocation(JSON.parse(event.body));
        return { statusCode: 200, body: list };
    }
    if (event.path.includes('/stops/alerts')) {
        if (!event.queryStringParameters || !event.queryStringParameters.stopId) {
            return {
                statusCode: 400,
                body: 'No stopId provided in query params'
            };
        }
        const list = await routes_1.alertsForStop(JSON.parse(event.queryStringParameters.stopId));
        return { statusCode: 200, body: list };
    }
    if (event.path.includes('/stops/neighbor')) {
        if (!event.queryStringParameters || !event.queryStringParameters.stopId) {
            return {
                statusCode: 400,
                body: 'No stopId provided in query params'
            };
        }
        const stop = await routes_1.neighborStop(JSON.parse(event.queryStringParameters.stopId));
        return { statusCode: 200, body: stop };
    }
    return { statusCode: 404, body: '' };
};
const handleLocationParams = (event) => {
    if (!event.queryStringParameters) {
        return {
            statusCode: 400,
            body: 'No query string parameters provided. Require query parameters: latitude, longitude'
        };
    }
    if (!event.queryStringParameters.latitude) {
        return { statusCode: 400, body: 'Latitude query string parameter not provided' };
    }
    if (!event.queryStringParameters.longitude) {
        return { statusCode: 400, body: 'Longitude query string parameter not provided' };
    }
    return null;
};