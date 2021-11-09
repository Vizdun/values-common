import "./css/style.css"
import { customCss, general, questionsShort } from "./data"
import { indexHtml } from "./pages/index"
import { instructions } from "./pages/instructions"
import { quiz } from "./quiz"
import { results } from "./results"

export enum Page {
	index,
	instructions,
	quiz,
	results,
}

document.title = general.title

export function changePage(dest: number) {
	switch (dest) {
		case Page.index:
			document.body.innerHTML = indexHtml + customCss
			document
				.getElementById("instructionButton")
				.addEventListener("click", () => {
					changePage(Page.instructions)
				})
			break
		case Page.instructions:
			document.body.innerHTML = instructions + customCss
			document.getElementById("quizButton").addEventListener("click", () => {
				changePage(Page.quiz)
			})
			document.getElementById("backButton").addEventListener("click", () => {
				changePage(Page.index)
			})
			document.getElementById("shuffleButton").addEventListener("click", () => {
				quiz(true)
			})
			if (questionsShort) {
				document.getElementById("shortButton").addEventListener("click", () => {
					quiz(false, true)
				})
				document
					.getElementById("shortShuffleButton")
					.addEventListener("click", () => {
						quiz(true, true)
					})
			}
			break
		case Page.quiz:
			quiz()
			break
		case Page.results:
			results()
			break
	}
}

if (location.search) {
	changePage(Page.results)
} else {
	changePage(Page.index)
}
