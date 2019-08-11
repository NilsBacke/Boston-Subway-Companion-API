"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeAlert(json, stopId) {
    const attributes = json.attributes;
    return {
        stopId: stopId,
        id: json.id,
        startDate: attributes.active_period[0].start,
        endDate: attributes.active_period[0].end,
        timeframe: attributes.timeframe,
        title: attributes.service_effect,
        subtitle: attributes.short_header,
        description: attributes.description,
        updatedAt: attributes.updated_at
    };
}
exports.makeAlert = makeAlert;
