"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const MBTAred = '0xFFDA291C';
const MBTAorange = '0xFFED8B00';
const MBTAblue = '0xFF003DA5';
const MBTAgreen = '0xFF00843D';
function makeStop(data) {
    const desc = data['attributes']['description'];
    const lineName = getLineName(desc, data);
    const directionDestination = data['attributes'].platform_name;
    const directionName = convertDirectionToName(data['attributes'].platform_name);
    return {
        id: data.id,
        name: data['attributes'].name,
        latitude: data['attributes'].latitude,
        longitude: data['attributes'].longitude,
        directionDestination: directionDestination,
        directionName: directionName,
        lineName: lineName,
        textColorHex: getTextColor(lineName),
        lineColorHex: getLineColor(lineName),
        lineInitials: getLineInitials(lineName),
        directionDescription: getDirectionDescription(directionDestination, directionName)
    };
}
exports.makeStop = makeStop;
function getLineName(desc, data) {
    if (desc.indexOf('-') === desc.lastIndexOf('-')) {
        // end of line stop
        return data['attributes']['platform_name'];
    }
    return desc.substring(desc.indexOf('- ') + 2, desc.lastIndexOf(' -'));
}
function getDirectionDescription(directionDestination, directionName) {
    return directionName + 'bound towards ' + directionDestination;
}
function getLineInitials(lineName) {
    return lineName === 'Mattapan' ? 'M' : lineName[0].toUpperCase() + 'L';
}
function getLineColor(lineName) {
    switch (lineName) {
        case 'Orange Line':
            return MBTAorange;
        case 'Green Line':
            return MBTAgreen;
        case 'Blue Line':
            return MBTAblue;
        case 'Red Line':
        case 'Mattapan':
        case 'Mattapan Trolley':
            return MBTAred;
        default:
            return '';
    }
}
function getTextColor(lineName) {
    switch (lineName) {
        case 'Orange Line':
            return '0xFFFF9800';
        case 'Green Line':
            return '0xFF4CAF50';
        case 'Blue Line':
            return '0xFF2196F3';
        case 'Red Line':
        case 'Mattapan':
        case 'Mattapan Trolley':
            return '0xFFF44336';
        default:
            return '';
    }
}
function convertDirectionToName(direction) {
    if (direction == 'Park Street & North') {
        return 'East';
    }
    if (constants_1.northList.includes(direction) ||
        direction.toLowerCase().includes('north') ||
        direction.toLowerCase().includes(constants_1.northList.reduce((t1, t2) => t1.toString() + t2.toString()))) {
        return 'North';
    }
    else if (constants_1.southList.includes(direction) ||
        direction.toLowerCase().includes('south') ||
        direction.toLowerCase().includes(constants_1.southList.reduce((t1, t2) => t1.toString() + t2.toString()))) {
        return 'South';
    }
    else if (constants_1.eastList.includes(direction) ||
        direction.toLowerCase().includes('east') ||
        direction.toLowerCase().includes(constants_1.eastList.reduce((t1, t2) => t1.toString() + t2.toString()))) {
        return 'East';
    }
    else if (constants_1.westList.includes(direction) ||
        direction.toLowerCase().includes('west') ||
        direction.toLowerCase().includes(constants_1.westList.reduce((t1, t2) => t1.toString() + t2.toString()))) {
        return 'West';
    }
    else {
        // TODO: will need to do something with these weird stops
        return '';
    }
}
