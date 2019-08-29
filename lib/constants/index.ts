export { stopToRouteMap } from './mapStopsToRoutes'

export const northList: string[] = ['Alewife', 'Oak Grove']
export const southList: string[] = ['Ashmont/Braintree', 'Ashmont', 'Braintree', 'Forest Hills', 'Mattapan']
export const westList: string[] = [
	'Bowdoin',
	'Boston College',
	'Cleveland Circle',
	'Riverside',
	'Heath Street',
	'Cleveland Circle/Riverside'
]
export const eastList: string[] = ['Wonderland', 'Park Street', 'North Station', 'Government Center', 'Lechmere']

export const endStops: string[] = [
	'Oak Grove',
	'Forest Hills',
	'Alewife',
	'Braintree',
	'Mattapan',
	'Ashmont',
	'Wonderland',
	'Bowdoin',
	'Lechmere',
	'North Station',
	'Government Center',
	'Park Street',
	'Boston College',
	'Cleveland Circle',
	'Riverside',
	'Heath Street'
]

export const lines: string[] = ['Red', 'Orange', 'Blue', 'Green-B', 'Green-C', 'Green-D', 'Green-E']

export const standardUserError = 'Unable to load data at this time. Please try again.'
export const stopUserError = 'Unable to load stop. Please try again.'
export const missingLocationParamsError =
	'No query string parameters provided. Require query parameters: latitude, longitude'
export const stopIdParamsError = 'stopId parameter not provided'
export const stopNameParamsError = 'stopName parameter not provided'
export const noMatchingRouteError = 'No matching endpoint'
