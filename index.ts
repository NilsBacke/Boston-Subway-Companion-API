import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda'

var packagejson = require('./package.json')
import {
	nearest,
	allNearby,
	stopsAtSameLocation,
	alertsForStop,
	neighborStop,
	direction,
	timeBetween
} from './lib/routes'
import { makeError } from './lib/models'
import { stopIdParamsError, standardUserError, noMatchingRouteError, missingLocationParamsError } from './lib/constants'
console.log('loaded ' + packagejson.name + ', version ' + packagejson.version)

exports.handler = async function(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
	if (!event.path) {
		return { statusCode: 404, body: '' }
	}

	if (event.path.includes('/stops/nearest')) {
		const error = handleLocationParams(event)
		if (error) {
			return error
		}

		const list = await nearest(event.queryStringParameters)
		return { statusCode: 200, body: list }
	}

	if (event.path.includes('/stops/allnearby')) {
		const error = handleLocationParams(event)
		if (error) {
			return error
		}

		const list = await allNearby(event.queryStringParameters, Number(event.queryStringParameters!.range))

		return { statusCode: 200, body: list }
	}

	if (event.path.includes('/stops/location')) {
		if (!event.body) {
			return {
				statusCode: 400,
				body: makeError('No stop provided in request body', 'Cannot load stop') as string
			}
		}

		const list = await stopsAtSameLocation(JSON.parse(event.body))

		return { statusCode: 200, body: list }
	}

	if (event.path.includes('/stops/alerts')) {
		if (!event.queryStringParameters || !event.queryStringParameters.stopId) {
			return {
				statusCode: 400,
				body: makeError('stopId parameter not provided', 'Cannot load stop') as string
			}
		}

		const list = await alertsForStop(JSON.parse(event.queryStringParameters.stopId))

		return { statusCode: 200, body: list }
	}

	if (event.path.includes('/stops/neighbor')) {
		if (!event.queryStringParameters || !event.queryStringParameters.stopId) {
			return {
				statusCode: 400,
				body: makeError(stopIdParamsError, standardUserError) as string
			}
		}

		const stop = await neighborStop(JSON.parse(event.queryStringParameters.stopId))

		return { statusCode: 200, body: stop }
	}

	if (event.path.includes('/stops/direction')) {
		if (
			!event.queryStringParameters ||
			!event.queryStringParameters.stop1Name ||
			!event.queryStringParameters.stop2Name
		) {
			return {
				statusCode: 400,
				body: makeError(stopIdParamsError, standardUserError) as string
			}
		}

		const endStopName = await direction(
			event.queryStringParameters.stop1Name,
			event.queryStringParameters.stop2Name
		)

		return { statusCode: 200, body: endStopName }
	}

	if (event.path.includes('/stops/timebetween')) {
		if (
			!event.queryStringParameters ||
			!event.queryStringParameters.stop1Name ||
			!event.queryStringParameters.stop2Name
		) {
			return {
				statusCode: 400,
				body: makeError(stopIdParamsError, standardUserError) as string
			}
		}

		const minutes = await timeBetween(event.queryStringParameters.stop1Name, event.queryStringParameters.stop2Name)

		return { statusCode: 200, body: minutes }
	}

	return { statusCode: 404, body: makeError(noMatchingRouteError, standardUserError) as string }
}

const handleLocationParams = (event: APIGatewayEvent): APIGatewayProxyResult | null => {
	if (
		!event.queryStringParameters ||
		!event.queryStringParameters!.latitude ||
		!event.queryStringParameters!.longitude
	) {
		return {
			statusCode: 400,
			body: makeError(missingLocationParamsError, standardUserError) as string
		}
	}
	return null
}
