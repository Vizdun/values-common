import { axes, general, Ideology } from "./data"
import { leaningLabel } from "./pages/results"

export function renderCanvas(
	resultEffects: { [index: string]: number },
	ideology: Ideology,
	matchings: (string | false)[]
) {
	const globalY = -18 - 6

	var c = document.getElementById("banner") as HTMLCanvasElement
	var ctx = c.getContext("2d")
	ctx.fillStyle = "#EEEEEE"
	ctx.fillRect(0, 0, 800, 170 + 120 * axes.length + globalY)

	ctx.fillStyle = "#222222"

	ctx.font =
		"700 " + 4000 / ctx.measureText(general.title).width + "px Montserrat"
	ctx.textAlign = "left"
	ctx.fillText(general.title, 20, 90 + globalY)

	ctx.font = "50px Montserrat"
	ctx.fillText(ideology.name, 20, 140 + globalY)

	ctx.textAlign = "right"
	ctx.font =
		"300 " + 12000 / ctx.measureText(general.link).width + "px Montserrat"
	ctx.fillText(general.link, 780, 60 + globalY + 6)
	ctx.fillText(general.version, 780, 90 + globalY + 6)

	axes.forEach((axis, index) => {
		const defThickness = 72
		const defOut = 4

		const height = 120 * index + globalY
		const iHeight = 170 + height
		const bHeight =
			180 +
			height -
			(defThickness + defOut * 2 - (defThickness + defOut * 2)) / 2
		const biHeight = 184 + height - (defThickness - defThickness) / 2
		const bitHeight = 237.5 + height + (defThickness - defThickness) / 4
		const biTHeight =
			175 +
			height -
			(defThickness + defOut * 2 - (defThickness + defOut * 2)) / 2
		
		var img = new Image(200, 200)
		img.onload = () => {
			ctx.drawImage(img, 20, iHeight, 100, 100)
		}
		img.src = axis.left.icon

		var img2 = new Image(200, 200)
		img2.onload = () => {
			ctx.drawImage(img2, 680, iHeight, 100, 100)
		}
		img2.src = axis.right.icon

		ctx.fillStyle = "#222222"
		ctx.fillRect(120, bHeight, 560, defThickness + defOut * 2)

		ctx.fillStyle = axis.left.color
		ctx.fillRect(
			120,
			biHeight,
			(560 / 100) * resultEffects[axis.id] - defOut / 2,
			defThickness
		)
		ctx.fillStyle = axis.right.color
		ctx.fillRect(
			120 + (560 / 100) * resultEffects[axis.id] + defOut / 2,
			biHeight,
			(560 / 100) * (100 - resultEffects[axis.id]) - defOut / 2,
			defThickness
		)

		ctx.fillStyle = "#222222"
		ctx.font = 0.625 * defThickness + "px Montserrat"

		ctx.textAlign = "left"
		if (resultEffects[axis.id] > 30) {
			ctx.fillText(resultEffects[axis.id].toFixed(1) + "%", 130, bitHeight)
		}
		ctx.textAlign = "right"
		if (100 - resultEffects[axis.id] > 30) {
			ctx.fillText(
				(100 - resultEffects[axis.id]).toFixed(1) + "%",
				670,
				bitHeight
			)
		}
		ctx.fillStyle = "#222222"
		ctx.font = "300 30px Montserrat"
		ctx.textAlign = "center"
		ctx.fillText(
			`${
				matchings[index]
					? `${axis.name} Axis: ${matchings[index]}`
					: `${leaningLabel(resultEffects[axis.id], axis)}`
			}`,
			400,
			biTHeight
		)
	})
}
