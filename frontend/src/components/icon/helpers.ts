export const attrNormalize = (attributes?: { [key: string]: string }): { [key: string]: string } => {
	const attrs : { [key: string]: string } = {}
	if (!attributes) return attrs
	for (const [key, value] of Object.entries(attributes)) {
		attrs[key] = value
	}
	return attrs
}
