import { baseURL, apiKey } from '.'
import { executeCall } from '../shared/executeCall'
import { makeStop } from '../models/stop'

export async function neighborStop(stopId: string): Promise<string> {
	const stopIdNum: number = Number(stopId)

	const url = `${baseURL}/stops?api_key=${apiKey}&filter[route_type]=1&filter[id]=${stopIdNum},${stopIdNum -
		1},${stopIdNum + 1}`
	// stopID, stopID - 1, stopID + 1
	const json = await executeCall(url)

	console.log(json)
	// TODO: handle error of json
	const data = json.data
	const nameToMatch = data[0].attributes.name

	for (var i = 1; i < data.length; i++) {
		if (nameToMatch === data[i].attributes.name) {
			return JSON.stringify(makeStop(data[i]))
		}
	}

	return JSON.stringify(makeStop(data[0]))
}
