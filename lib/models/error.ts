interface Error {
	error: string
	userError: string
}

export function makeError(error: string, userError: string, stringify: boolean = true): string | Error {
	const obj = {
		error: error,
		userError: userError
	}
	if (stringify) {
		return JSON.stringify(obj)
	}
	return obj
}
