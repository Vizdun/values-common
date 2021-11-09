import { changePage, Page } from "."
import {
	axes,
	buttons,
	customCss,
	maxEffects as maxEffectsLong,
	maxEffectsShort,
	Question,
	questions as questions_original,
	questionsShort,
} from "./data"
import { quizHtml } from "./pages/quiz"

var questionIndex = 0

var questionNumber: HTMLElement, questionText: HTMLElement

var effects: {
	[index: string]: number
}[] = []

export function quiz(shuffled: boolean = false, short: boolean = false) {
	var questions: Question[] = short
		? shuffled
			? // @ts-ignore
			  questionsShort.sort(() => 0.5 - Math.random())
			: questionsShort
		: shuffled
		? questions_original.sort(() => 0.5 - Math.random())
		: questions_original

	function initQuestion() {
		questionNumber.innerText = `Question ${questionIndex + 1} of ${
			questions.length
		}`

		questionText.innerText = questions[questionIndex].question
	}

	function prevQuestion() {
		if (questionIndex > 0) {
			questionIndex--
			initQuestion()
		} else {
			changePage(Page.index)
		}
	}

	function nextQuestion(buttonIndex: number) {
		effects[questionIndex] = {}
		for (const axis of axes) {
			effects[questionIndex][axis.id] =
				questions[questionIndex].effect[axis.id] * buttons[buttonIndex].modifier
		}
		questionIndex++
		initQuestion()
	}

	function showResults(short: boolean = false) {
		var finalEffects = effects[0]

		for (const axis of axes) {
			finalEffects[axis.id] = effects
				.map((item) => {
					return item[axis.id]
				})
				.reduce((a, b) => a + b, 0)
		}

		var score = finalEffects

		const maxEffects = short ? maxEffectsShort : maxEffectsLong

		for (const key in finalEffects) {
			score[key] =
				(finalEffects[key] + maxEffects[key]) /
				((maxEffects[key] + maxEffects[key]) * 0.01)
		}

		location.search =
			"?" +
			Object.values(score)
				.map((item) => item.toFixed(1))
				.join(",")
	}

	document.body.innerHTML = quizHtml + customCss

	let buttonElements = document.getElementsByClassName("button")

	for (let i = 0; i < buttonElements.length; i++) {
		buttonElements[i].addEventListener("click", () => {
			if (questionIndex + 1 < questions.length) {
				nextQuestion(i)
			} else {
				effects[questionIndex] = {}
				for (const axis of axes) {
					effects[questionIndex][axis.id] =
						questions[questionIndex].effect[axis.id] * buttons[i].modifier
				}
				questionIndex++
				showResults(short)
			}
		})
	}

	document.getElementById("backQButton").addEventListener("click", () => {
		prevQuestion()
	})

	questionNumber = document.getElementById("questionNumber")
	questionText = document.getElementById("questionText")

	initQuestion()
}
