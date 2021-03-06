import { distanceMatrixKey } from './secrets'
import { executeCall } from '../shared/executeCall'
import { standardUserError } from '../constants'
import { makeError } from '../models'

export async function timeBetweenStops(stop1Name: string, stop2Name: string): Promise<string> {
	try {
		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=transit&origins=${stop1Name} t stop&destinations=${stop2Name} t stop&key=${distanceMatrixKey}`

		const result = await executeCall(url)

		// TODO: error handling?
		const seconds = result['rows'][0]['elements'][0]['duration']['value']

		const minutes = (seconds / 60).toFixed(0)

		return JSON.stringify({
			minutes: minutes
		})
	} catch (e) {
		return makeError(e.toString(), standardUserError) as string
	}
}
