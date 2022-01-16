const fs = require("fs")

let axes = JSON.parse(fs.readFileSync("resources/json/axes.json").toString())

function formatSvg(svg) {
	return "data:image/svg+xml;base64," + btoa(svg)
}

axes.forEach((axis, index) => {
	axes[index].left.icon = formatSvg(
		fs.readFileSync(`resources/value_images/${axis.id}_0.svg`).toString()
	)
	axes[index].right.icon = formatSvg(
		fs.readFileSync(`resources/value_images/${axis.id}_1.svg`).toString()
	)
})

let general = JSON.parse(
	fs.readFileSync("resources/json/general.json").toString()
)

general.favicon = formatSvg(fs.readFileSync("resources/favicon.svg"))

const newJson = {
	axes: axes,
	buttons: JSON.parse(
		fs.readFileSync("resources/json/buttons.json").toString()
	),
	general: general,
	questions: JSON.parse(
		fs.readFileSync("resources/json/questions.json").toString()
	),
	results: JSON.parse(
		fs.readFileSync("resources/json/results.json").toString()
	),
}

fs.writeFileSync("src/jsoned_data.txt", "@-@" + JSON.stringify(newJson) + "@-@")
