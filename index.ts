import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda'

var packagejson = require('./package.json')
import nearest from './lib/nearest'
console.log('loaded ' + packagejson.name + ', version ' + packagejson.version)

exports.handler = async function(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
	if (event.path.includes('/stops/nearest/')) {
		const list = await nearest(event.queryStringParameters)
		return { statusCode: 200, body: list }
	}
	return { statusCode: 404, body: '' }
}
