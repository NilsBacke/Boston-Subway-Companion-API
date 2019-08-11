import { directionsKey } from './secrets'
import { executeCall } from '../shared/executeCall'
import { standardUserError, endStops } from '../constants'
import { makeError } from '../models'

export async function direction(stop1Name: string, stop2Name: string): Promise<string> {
	try {
		const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${stop1Name} t stop&destination=${stop2Name} t stop&mode=transit&key=${directionsKey}`

		const result = await executeCall(url)

		// TODO: error handling?
		const steps = result['routes'][0]['legs'][0]['steps']

		for (const step of steps) {
			const instructionsCase = step['html_instructions']
			const instructions = instructionsCase.toLowerCase()
			for (const endStop of endStops) {
				if (instructions.contains(('towards ' + endStop).toLowerCase()) && !instructions.contains('walk')) {
					return endStop
				}
			}
		}

		return ''
	} catch (e) {
		return makeError(e.toString(), standardUserError) as string
	}
}