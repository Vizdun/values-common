import { changePage, Page } from "."
import { customCss } from "./data"
import { resultsHtml } from "./pages/results"

export function results() {
	document.body.innerHTML = resultsHtml() + customCss
	document.getElementById("backButton").addEventListener("click", () => {
		location.search = ""
	})
}
