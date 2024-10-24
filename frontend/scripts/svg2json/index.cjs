/* eslint-disable no-undef */
const path = require("path")
const fs = require("fs")
const { optimize } = require("svgo")
const { parseSync } = require("svgson")
const { argv } = require("yargs")

const getPath = (param) => (param.startsWith("/") ? param : path.join(process.cwd(), param))

const svgToJson = (svgString, options) => {
	const optimizedContent = optimize(svgString, {
		plugins: [
			{ name: "removeViewBox", enabled: false },
			{ name: "removeDimensions", enabled: true },
		],
	})
	const parsedContent = parseSync(optimizedContent.data, options)
	return parsedContent
}

const source = getPath(argv.i)
const dest = getPath(argv.o)

const svgsMap = fs.readdirSync(source).reduce((acc, fileName) => {
	const [name, ext] = fileName.split(".")
	if (ext !== "svg") {
		return acc
	}

	const fileContent = fs.readFileSync(path.join(source, fileName)).toString()

	return {
		...acc,
		[name]: svgToJson(fileContent),
	}
}, {})

fs.writeFileSync(dest, JSON.stringify(svgsMap))
