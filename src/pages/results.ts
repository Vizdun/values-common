import {
	axes,
	canvas,
	fallbackImage,
	general,
	ideologies,
	Ideology,
} from "../data"
import download from "../svg/download.svg"

export function leaningValue(val: number) {
	const tiers = ["Neutral", "Moderate", "Strong", "Extreme", "Fanatic"]

	var indx = Math.round(Math.abs(val - 50) * 0.02 * tiers.length) - 1

	return tiers[indx > 0 ? indx : 0]
}

export function resultsHtml(
	resultEffects: { [index: string]: number },
	ideology: Ideology,
	matchings: (string | false)[]
) {
	var resultsAxisHtml = ""

	for (let i = 0; i < axes.length; i++) {
		const axis = axes[i]

		const maxShown = canvas.limit ?? 30

		resultsAxisHtml += `<h2>${`${
			matchings[i]
				? `${axis.name} Axis: ${matchings[i]}`
				: `${leaningValue(resultEffects[axis.id])} ${
						resultEffects[axis.id] > 50 ? axis.right.name : axis.left.name
				  }`
		}`}<span class="weight-300" id="economic-label"></span></h2><div class="axis"><img src="${fallbackImage(
			axis,
			false
		)}" height="128pt" /><div style="background-color:${
			axis.left.color
		};border-right-style:solid;text-align:left;width:${
			resultEffects[axis.id]
		}%" class="bar"><div class="text-wrapper">${
			resultEffects[axis.id] > maxShown
				? resultEffects[axis.id].toFixed(1) + "%"
				: ""
		}</div></div><div style="background-color:${
			axis.right.color
		};border-left-style:solid;text-align:right;width:${
			100 - resultEffects[axis.id]
		}%" class="bar"><div class="text-wrapper">${
			100 - resultEffects[axis.id] > maxShown
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
<h2>Closest Match: ${ideology.name}</h2>
<hr />
<canvas id="banner" width="800" height="${
		170 + 120 * axes.length + -18 - 6
	}"></canvas>
<div id="downloadButton">${download}</div>
<button class="button" id="backButton">Back</button>
<br />`
}
