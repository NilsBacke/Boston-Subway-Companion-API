import { distanceMatrixKey } from './secrets'
import { executeCall } from '../shared/executeCall'
import { standardUserError } from '../constants'
import { makeError } from '../models'

export async function timeBetweenWalk(stopName: string, latitude: number, longitude: number): Promise<string> {
	try {
		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=transit&origins=${latitude},${longitude}&destinations=${stopName} t stop&key=${distanceMatrixKey}`

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
