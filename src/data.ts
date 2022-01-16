import jsoned_data from "./jsoned_data.txt"

export interface Axis {
	id: string
	name: string
	left: Value
	right: Value
	tiers: string[]
}

export interface Value {
	name: string
	description: string
	color: string
	icon: string
}

export interface General {
	title: string
	github: string
	description: string
	valQuestion: string
	valDescription: string
	link: string
	version: string
	favicon: string
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

const mainJson: {
	axes: Axis[],
	buttons: Button[]
	questions: Question[]
	general: General,
	results: Ideology[]
} = JSON.parse(
	jsoned_data.slice(
		3, -3
	)
)

export const axes: Axis[] = mainJson.axes
export const buttons: Button[] = mainJson.buttons
export const questions: Question[] = mainJson.questions
export const general: General = mainJson.general
export const ideologies: Ideology[] = mainJson.results

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

export const maxEffectsShort = maxVals
