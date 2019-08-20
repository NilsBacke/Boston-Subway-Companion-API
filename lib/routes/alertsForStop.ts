import { baseURL, apiKey } from '.'
import { executeCall } from '../shared/executeCall'
import { Alert, makeError } from '../models'
import { makeAlert } from '../models/alert'
import { standardUserError } from '../constants'

export async function alertsForStop(stopId: string): Promise<string> {
	try {
		const url = `${baseURL}/alerts?api_key=${apiKey}&filter[stop]=${stopId}`
		const json = await executeCall(url)

		console.log(json)
		// TODO: handle error of json
		const data = json.data
		let result: Alert[] = []
		if (!data || data.length === 0) {
			result = []
		}

		for (let i = 0; i < data.length; i++) {
			result.push(makeAlert(data[i], stopId))
		}

		return JSON.stringify(result)
	} catch (e) {
		console.log(e)
		return makeError(e.toString(), standardUserError) as string
	}
}
