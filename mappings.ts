const nodeFetch = require('node-fetch')
const fs = require('fs')

const apiKey = 'dc44b30101114e88b45041a4a9b65e06'
const baseURL = 'https://api-v3.mbta.com'

interface Route {
	id: string
	name: string
}

const mapping: { [stopId: string]: Route[] } = {}

async function getMapping() {
	const routeIds = await getRouteIds()

	for (var i = 0; i < routeIds.length; i++) {
		const stopIds = await getStopsOnRoute(routeIds[i].id)
		for (var j = 0; j < stopIds.length; j++) {
			if (mapping[stopIds[j]]) {
				mapping[stopIds[j]].push(routeIds[i])
			} else {
				mapping[stopIds[j]] = [routeIds[i]]
			}
		}
		await sleep(250)
	}
}

async function getStopsOnRoute(routeId: string): Promise<string[]> {
	const response = await nodeFetch(
		baseURL + '/stops?api_key=' + apiKey + '&filter[route]=' + routeId + '&filter[route_type]=3',
		{
			method: 'GET'
		}
	)
	const json = await response.json()

	const stopIds = []

	for (const stop of json.data) {
		stopIds.push(stop.id)
	}

	return stopIds
}

async function getRouteIds(): Promise<Route[]> {
	const response = await nodeFetch(baseURL + '/routes?filter[type]=3', {
		method: 'GET'
	})
	const json = await response.json()

	const routeIds = []

	for (const route of json.data) {
		routeIds.push({ id: route.id, name: route.attributes.short_name })
	}

	return routeIds
}

function sleep(ms: number) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

getMapping().then(() => {
	console.log(mapping)
	fs.writeFile('mapStopsToRoutes.js', JSON.stringify(mapping), function(err: string) {
		if (err) {
			return console.log(err)
		}

		console.log('The file was saved!')
	})
})
