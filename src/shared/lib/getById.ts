export const getById = <K, V>(
	map: Map<K, V>,
	key: K | null | undefined
): V | undefined => {
	if (key === null || key === undefined) {
		return undefined
	}

	return map.get(key)
}
