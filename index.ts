import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda'

var packagejson = require('./package.json')
import nearest from './lib/routes/nearest'
import allNearby from './lib/routes/allNearby'
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

	return { statusCode: 404, body: '' }
}

const handleLocationParams = (event: APIGatewayEvent) => {
	if (!event.queryStringParameters) {
		return {
			statusCode: 400,
			body: 'No query string parameters provided. Require query parameters: latitude, longitude'
		}
	}
	if (!event.queryStringParameters!.latitude) {
		return { statusCode: 400, body: 'Latitude query string parameter not provided' }
	}
	if (!event.queryStringParameters!.longitude) {
		return { statusCode: 400, body: 'Longitude query string parameter not provided' }
	}
	return null
}
