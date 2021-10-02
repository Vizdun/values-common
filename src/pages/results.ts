import { axes, fallbackImage, general, ideologies } from "../data"

// TODO: ideology stuff

function matchIdeology(stats: { [index: string]: number }) {
	return ideologies[
		ideologies
			.map((item, index) => {
				var difs: { [index: string]: number } = {}

				for (const stat in stats) {
					difs[stat] = Math.abs(item.stats[stat] - stats[stat]) * 0.01
				}

				return [
					index,
					Object.values(difs).reduce((prev, cur) => {
						return prev * cur
					}),
				]
			})
			.sort((a, b) => {
				return a[1] - b[1]
			})[0][0]
	].name
}

export function resultsHtml() {
	const resultEffects = Object.fromEntries(
		location.href
			.split("?")[1]
			.split(",")
			.map((item, index) => {
				return [axes[index].id, parseFloat(item)]
			})
	)

	var resultsAxisHtml = ""

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

	for (let i = 0; i < axes.length; i++) {
		const axis = axes[i]

		resultsAxisHtml += `<h2>${axis.name} Axis: ${
			matchings[i]
		}<span class="weight-300" id="economic-label"></span></h2><div class="axis"><img src="${fallbackImage(
			axis,
			false
		)}" height="128pt" /><div style="background-color:${
			axis.left.color
		};border-right-style:solid;text-align:left;width:${
			resultEffects[axis.id]
		}%" class="bar"><div class="text-wrapper">${
			resultEffects[axis.id] > 30 ? resultEffects[axis.id].toFixed(1) + "%" : ""
		}</div></div><div style="background-color:${
			axis.right.color
		};border-left-style:solid;text-align:right;width:${
			100 - resultEffects[axis.id]
		}%" class="bar"><div class="text-wrapper">${
			100 - resultEffects[axis.id] > 30
				? (100 - resultEffects[axis.id]).toFixed(1) + "%"
				: ""
		}</div></div><img src="${fallbackImage(
			axis,
			true
		)}" height="128pt" /></div>`
	}

	return `<h1>${general.title}</h1>
<hr />
<h1>Results</h1>
${resultsAxisHtml}
<h2>Closest Match: ${matchIdeology(resultEffects)}</h2>
<hr />
<img src="" id="banner" />
<button class="button" id="backButton">Back</button>
<br />`
}
