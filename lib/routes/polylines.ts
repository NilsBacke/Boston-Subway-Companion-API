import { baseURL, apiKey } from '.'
import { executeCall } from '../shared/executeCall'
import { standardUserError, lines } from '../constants'
import { makeError } from '../models'

export async function polylines(): Promise<string> {
	try {
		const promises = lines.map(line => executeCall(`${baseURL}/shapes?api_key=${apiKey}&filter[route]=$line`))

		const results = await Promise.all(promises)

		const polylines = []

		for (const result of results) {
			for (const data of result.data) {
				polylines.push(data.attributes.polyline)
			}
		}

		return JSON.stringify({ polylines: polylines })
	} catch (e) {
		return makeError(e.toString(), standardUserError) as string
	}
}
