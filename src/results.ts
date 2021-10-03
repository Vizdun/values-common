import { changePage, Page } from "."
import { axes, customCss, ideologies } from "./data"
import { resultsHtml } from "./pages/results"
import { renderCanvas } from "./renderCanvas"

function matchIdeology(stats: { [index: string]: number }) {
	return ideologies[
		ideologies
			.map((item, index) => {
				var difs: { [index: string]: number } = {}

				for (const stat in stats) {
					difs[stat] =
						Math.abs(item.stats[stat] - stats[stat]) *
						(axes.find((item) => {
							return item.id === stat
						}).weight
							? axes.find((item) => {
									return item.id === stat
							  }).weight
							: 1)
				}

				return [
					index,
					Object.values(difs).reduce((prev, cur) => {
						return prev + cur
					}),
				]
			})
			.sort((a, b) => {
				return a[1] - b[1]
			})[0][0]
	]
}

function matchings(resultEffects: { [index: string]: number }) {
	var matchings: string[] = []

	for (let i = 0; i < axes.length; i++) {
		var sum = 0
		var tiers: number[] = []
		for (let i2 = 0; i2 < axes[i].tiers.length; i2++) {
			sum += 100 / axes[i].tiers.length
			tiers[i2] = sum
		}

		for (let i2 = 0; i2 < tiers.length; i2++) {
			if (resultEffects[axes[i].id] < tiers[i2]) {
				matchings[i] = axes[i].tiers.reverse()[i2]
				break
			}
		}
	}

	return matchings
}

export function results() {
	const resultEffects = Object.fromEntries(
		location.href
			.split("?")[1]
			.split(",")
			.map((item, index) => {
				return [axes[index].id, parseFloat(item)]
			})
	)

	const ideology = matchIdeology(resultEffects)
	const matchingsv = matchings(resultEffects)

	document.body.innerHTML =
		resultsHtml(resultEffects, ideology, matchingsv) + customCss

	document.getElementById("backButton").addEventListener("click", () => {
		location.search = ""
	})
	window.onload = () => {
		renderCanvas(resultEffects, ideology, matchingsv)
	}
}
