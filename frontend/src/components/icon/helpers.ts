type GenericObject = { [key: string]: unknown }

export const attrNormalize = (attributes?: GenericObject): GenericObject => {
	const attrs: GenericObject = {}
	if (!attributes) return attrs
	for (const [key, value] of Object.entries(attributes)) {
		attrs[key] = value
	}
	return attrs
}
