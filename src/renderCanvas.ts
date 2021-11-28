import { axes, canvas, fallbackImage, general, Ideology } from "./data"
import { leaningLabel } from "./pages/results"

export function renderCanvas(
	resultEffects: { [index: string]: number },
	ideology: Ideology,
	matchings: (string | false)[]
) {
	const globalY = -18 - 6

	var c = document.getElementById("banner") as HTMLCanvasElement
	var ctx = c.getContext("2d")
	ctx.fillStyle = canvas.bgColor
	ctx.fillRect(0, 0, 800, 170 + 120 * axes.length + globalY)

	ctx.fillStyle = canvas.fgColor

	ctx.font =
		"700 " +
		4000 / ctx.measureText(general.title).width +
		"px " +
		general.mainFont
	ctx.textAlign = "left"
	ctx.fillText(general.title, 20, 90 + globalY)

	ctx.font = "50px " + general.mainFont
	ctx.fillText(ideology.name, 20, 140 + globalY)

	ctx.textAlign = "right"
	ctx.font =
		"300 " +
		12000 / ctx.measureText(general.link).width +
		"px " +
		general.mainFont
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
			((canvas.barThickness ?? defThickness) +
				(canvas.outlineThickness ?? defOut) * 2 -
				(defThickness + defOut * 2)) /
				2
		const biHeight =
			184 + height - ((canvas.barThickness ?? defThickness) - defThickness) / 2
		const bitHeight =
			237.5 +
			height +
			((canvas.barThickness ?? defThickness) - defThickness) / 4
		const biTHeight =
			175 +
			height -
			((canvas.barThickness ?? defThickness) +
				(canvas.outlineThickness ?? defOut) * 2 -
				(defThickness + defOut * 2)) /
				2

		var img = new Image(200, 200)
		img.onload = () => {
			ctx.drawImage(img, 20, iHeight, 100, 100)
		}
		img.src = fallbackImage(axis, false)

		var img2 = new Image(200, 200)
		img2.onload = () => {
			ctx.drawImage(img2, 680, iHeight, 100, 100)
		}
		img2.src = fallbackImage(axis, true)

		ctx.fillStyle = canvas.valColor ?? canvas.fgColor
		ctx.fillRect(
			120,
			bHeight,
			560,
			(canvas.barThickness ?? defThickness) +
				(canvas.outlineThickness ?? defOut) * 2
		)

		ctx.fillStyle = axis.left.color
		ctx.fillRect(
			120,
			biHeight,
			(560 / 100) * resultEffects[axis.id] -
				(canvas.outlineThickness ?? defOut) / 2,
			canvas.barThickness ?? defThickness
		)
		ctx.fillStyle = axis.right.color
		ctx.fillRect(
			120 +
				(560 / 100) * resultEffects[axis.id] +
				(canvas.outlineThickness ?? defOut) / 2,
			biHeight,
			(560 / 100) * (100 - resultEffects[axis.id]) -
				(canvas.outlineThickness ?? defOut) / 2,
			canvas.barThickness ?? defThickness
		)

		ctx.fillStyle = canvas.valColor ?? canvas.fgColor
		ctx.font =
			0.625 * (canvas.barThickness ?? defThickness) + "px " + general.mainFont

		ctx.textAlign = "left"
		if (resultEffects[axis.id] > (canvas.limit ?? 30)) {
			ctx.fillText(resultEffects[axis.id].toFixed(1) + "%", 130, bitHeight)
		}
		ctx.textAlign = "right"
		if (100 - resultEffects[axis.id] > (canvas.limit ?? 30)) {
			ctx.fillText(
				(100 - resultEffects[axis.id]).toFixed(1) + "%",
				670,
				bitHeight
			)
		}
		ctx.fillStyle = canvas.fgColor
		ctx.font = "300 30px " + general.mainFont
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
