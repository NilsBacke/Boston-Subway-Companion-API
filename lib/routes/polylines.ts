import { baseURL, apiKey } from '.'
import { executeCall } from '../shared/executeCall'
import { standardUserError, lines } from '../constants'
import { makeError, Polyline } from '../models'
import { getTextColor } from '../models/stop'

export async function polylines(): Promise<string> {
	try {
		const promises = lines.map(line => executeCall(`${baseURL}/shapes?api_key=${apiKey}&filter[route]=${line}`))

		const results = await Promise.all(promises)

		const polylines: Polyline[] = []

		console.log(results)

		console.log(results[0].data)

		for (const result of results) {
			for (const data of result.data) {
				if (lines.includes(data.relationships.route.data.id)) {
					const lineName = data.relationships.route.data.id.includes('Green')
						? 'Green'
						: data.relationships.route.data.id
					polylines.push({
						lineTitle: lineName,
						polyline: data.attributes.polyline,
						color: getTextColor(lineName + ' Line')
					})
				}
			}
		}

		return JSON.stringify(polylines)
	} catch (e) {
		return makeError(e.toString(), standardUserError) as string
	}
}
