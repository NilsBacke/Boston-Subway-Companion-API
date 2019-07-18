import { baseURL, apiKey } from '.'
import { executeCall } from '../shared/executeCall'
import { Alert } from '../models'
import { makeAlert } from '../models/alert'

export async function alertsForStop(stopId: string): Promise<string> {
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
}
