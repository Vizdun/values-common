import * as yaml from "js-yaml"
import * as toml from "toml"

export interface Axis {
	id: string
	name: string
	left: Value
	right: Value
	tiers: string[]
	weights?: number[]
	weight?: number
}

export interface Value {
	name: string
	description: string
	color: string
	icon?: string
}

export interface General {
	title: string
	github: string
	description: string
	valQuestion: string
	valDescription: string
	mainFont: string
	link: string
	version: string
}

export interface Button {
	name: string
	modifier: number
	color: string
	focusColor: string
}

export interface Question {
	question: string
	effect: {
		[index: string]: number
	}
}

export interface Ideology {
	name: string
	stats: {
		[index: string]: number
	}
}

export interface Canvas {
	fgColor: string
	bgColor: string
	barThickness?: number
	outlineThickness?: number
	limit?: number
}

export const parentLoc = window.location.href.slice(
	0,
	window.location.href.lastIndexOf("/")
)

function getData(name: string) {
	const jsonLocation = "/json/" + name + ".json"
	const yamlLocation = "/yaml/" + name + ".yaml"
	if (isFile(jsonLocation)) {
		return getJson(name)
	} else if (isFile(yamlLocation)) {
		return getYaml(name)
	} else {
		return getToml(name)
	}
}

function getJson(name: string) {
	var request = new XMLHttpRequest()
	request.open("GET", parentLoc + "/json/" + name + ".json", false)
	request.send(null)
	return JSON.parse(request.responseText)
}

function getYaml(name: string) {
	var request = new XMLHttpRequest()
	request.open("GET", parentLoc + "/yaml/" + name + ".yaml", false)
	request.send(null)
	return yaml.load(request.responseText)
}

function getToml(name: string) {
	var request = new XMLHttpRequest()
	request.open("GET", parentLoc + "/toml/" + name + ".toml", false)
	request.send(null)
	const parsed = toml.parse(request.responseText)
	if (Object.keys(parsed)[0] === "0") {
		return Object.values(parsed)
	} else {
		return parsed
	}
}

function getCss(name: string) {
	var request = new XMLHttpRequest()
	request.open("GET", parentLoc + "/" + name + ".css", false)
	request.send(null)
	return request.responseText
}

function isFile(name: string) {
	var request = new XMLHttpRequest()
	request.open("HEAD", parentLoc + "/" + name, false)
	request.send(null)
	switch (request.status) {
		case 200:
			return true
		default:
			return false
	}
}

export function fallbackImage(axis: Axis, right: boolean) {
	return right
		? axis.right.icon
			? axis.right.icon
			: isFile(`value_images/${axis.id}_${right ? 1 : 0}.svg`)
			? `value_images/${axis.id}_${right ? 1 : 0}.svg`
			: `value_images/${axis.id}_${right ? 1 : 0}.png`
		: axis.left.icon
		? axis.left.icon
		: isFile(`value_images/${axis.id}_${right ? 1 : 0}.svg`)
		? `value_images/${axis.id}_${right ? 1 : 0}.svg`
		: `value_images/${axis.id}_${right ? 1 : 0}.png`
}

export const axes: Axis[] = getData("axes")
export const buttons: Button[] = getData("buttons")
export const questions: Question[] = getData("questions")
export const general: General = getData("general")
export const ideologies: Ideology[] = getData("ideologies")
export const canvas: Canvas = getData("canvas")

export const customCss = `<style>${getCss("style")}</style>`

var maxVals: {
	[index: string]: number
} = {}

for (const axis of axes) {
	maxVals[axis.id] = 0
}

for (const question of questions) {
	for (const axis of axes) {
		maxVals[axis.id] += Math.abs(question.effect[axis.id])
	}
}

export const maxEffects = maxVals
