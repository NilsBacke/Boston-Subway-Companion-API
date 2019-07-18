const fetch = require('node-fetch')

export async function executeCall(url: string): Promise<any> {
	const response = await fetch(url)
	const json = await response.json()
	console.log(JSON.stringify(json))
	return json
}
