const fetch = require('node-fetch')

export async function executeCall(url: string, method: string = 'GET'): Promise<any> {
	const response = await fetch(url, {
		method: method
	})
	const json = await response.json()
	// console.log(JSON.stringify(json))
	return json
}
