import "./css/style.css"
import { general } from "./data"
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

let link = document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = general.favicon;
document.getElementsByTagName('head')[0].appendChild(link);

export function changePage(dest: number) {
	switch (dest) {
		case Page.index:
			document.body.innerHTML = indexHtml
			document
				.getElementById("instructionButton")
				.addEventListener("click", () => {
					changePage(Page.instructions)
				})
			break
		case Page.instructions:
			document.body.innerHTML = instructions
			document.getElementById("quizButton").addEventListener("click", () => {
				changePage(Page.quiz)
			})
			document.getElementById("backButton").addEventListener("click", () => {
				changePage(Page.index)
			})
			document.getElementById("shuffleButton").addEventListener("click", () => {
				quiz(true)
			})
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
