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
	valColor?: string
	barThickness?: number
	outlineThickness?: number
	limit?: number
}

export const parentLoc = window.location.href.slice(
	0,
	window.location.href.lastIndexOf("/")
)

function getJson(name: string) {
	var request = new XMLHttpRequest()
	request.open("GET", parentLoc + "/json/" + name + ".json", false)
	request.send(null)
	return JSON.parse(request.responseText)
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

export const axes: Axis[] = getJson("axes")
export const buttons: Button[] = getJson("buttons")
export const questions: Question[] = getJson("questions")
export const questionsShort: Question[] | false = isFile(
	"json/questions_short.json"
)
	? getJson("questions_short")
	: false
export const general: General = getJson("general")
export const ideologies: Ideology[] = getJson("ideologies")
export const canvas: Canvas = getJson("canvas")
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

var maxVals: {
	[index: string]: number
} = {}

for (const axis of axes) {
	maxVals[axis.id] = 0
}

// @ts-ignore
for (const question of questionsShort as Question[]) {
	for (const axis of axes) {
		maxVals[axis.id] += Math.abs(question.effect[axis.id])
	}
}

export const maxEffectsShort = maxVals
