import { executeCall } from './executeCall'
import { Stop } from '../models'
import { makeStop } from '../models/stop'

export const handleMultipleStops = async (url: string) => {
	const json = await executeCall(url)

	console.log(json)
	// TODO: handle error of json
	const data = json.data
	if (!data || data.length === 0) {
		return JSON.stringify([])
	}

	const result: Stop[] = []
	for (let i = 0; i < data.length; i++) {
		result.push(makeStop(data[i]))
	}
	return JSON.stringify(result)
}
