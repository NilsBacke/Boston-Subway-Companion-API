import { handleMultipleStops } from '../shared/handleMultipleStops'
import { baseURL, apiKey } from '.'
import { fullStopList } from '../models/fullStopList'
import { fullStopList } from '../models/fullStopList'

const rangeInMiles = 1000

export async function allNearby(
    locationData: any,
    range?: number
): Promise<string> {
    // const radius = 0.02 * (range || rangeInMiles)

    // const url = `${baseURL}/stops?api_key=${apiKey}&filter[latitude]=${
    //     locationData!.latitude
    // }&filter[longitude]=${
    //     locationData!.longitude
    // }&filter[radius]=${radius}&filter[route_type]=0,1,3&sort=distance`

    // return (await handleMultipleStops(url, true)) as string

    const stops = fullStopList

    stops.sort(
        (stop1, stop2) =>
            distance(
                locationData.latitude,
                locationData.longitude,
                stop1.latitude,
                stop1.longitude
            ) <
            distance(
                locationData.latitude,
                locationData.longitude,
                stop2.latitude,
                stop2.longitude
            )
    )

    return JSON.stringify(fullStopList)
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0
    } else {
        var radlat1 = (Math.PI * lat1) / 180
        var radlat2 = (Math.PI * lat2) / 180
        var theta = lon1 - lon2
        var radtheta = (Math.PI * theta) / 180
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
            dist = 1
        }
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == 'K') {
            dist = dist * 1.609344
        }
        if (unit == 'N') {
            dist = dist * 0.8684
        }
        return dist
    }
}
