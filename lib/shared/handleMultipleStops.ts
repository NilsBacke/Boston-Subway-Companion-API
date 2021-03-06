import { executeCall } from './executeCall'
import { Stop, makeError } from '../models'
import { makeStop } from '../models/stop'
import { standardUserError } from '../constants'

/**
 * Will be returned in json string form
 * @param url
 * @param method
 */
export const handleMultipleStops = async (
    url: string,
    stringify: boolean = false,
    method: string = 'GET'
): Promise<string | Stop[]> => {
    try {
        const json = await executeCall(url, method)

        console.log(json)
        // TODO: handle error of json
        const data = json.data
        if (!data || data.length === 0) {
            if (stringify) {
                return JSON.stringify([])
            } else {
                return []
            }
        }

        const result: Stop[] = []
        for (let i = 0; i < data.length; i++) {
            if (
                !data[i].attributes.platform_name ||
                (!data[i].attributes.platform_name.includes('Drop-off Only') &&
                    !data[i].attributes.platform_name.includes('Exit Only'))
            ) {
                const stop = makeStop(data[i]) // stop(s)
                if (!!stop) {
                    result.push(...stop)
                }
            }
        }

        if (stringify) {
            return JSON.stringify(result)
        } else {
            return result
        }
    } catch (e) {
        console.log(e)
        return makeError(e.toString(), standardUserError, stringify) as string
    }
}
