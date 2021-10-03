import { axes, canvas, fallbackImage, general, Ideology } from "./data"

export function renderCanvas(
	resultEffects: { [index: string]: number },
	ideology: Ideology,
	matchings: string[]
) {
	var c = document.getElementById("banner") as HTMLCanvasElement
	var ctx = c.getContext("2d")
	ctx.fillStyle = canvas.bgColor
	ctx.fillRect(0, 0, 800, 170 + 120 * axes.length)

	var img: HTMLImageElement
	img = new Image(200, 200)

	ctx.fillStyle = canvas.fgColor

	ctx.font =
		"700 " +
		4000 / ctx.measureText(general.title).width +
		"px " +
		general.mainFont
	ctx.textAlign = "left"
	ctx.fillText(general.title, 20, 90)

	ctx.font = "50px " + general.mainFont
	ctx.fillText(ideology.name, 20, 140)

	ctx.textAlign = "right"
	ctx.font =
		"300 " +
		12000 / ctx.measureText(general.link).width +
		"px " +
		general.mainFont
	ctx.fillText(general.link, 780, 60)
	ctx.fillText(general.version, 780, 90)

	for (let i = 0; i < 2; i++) {
		axes.forEach((axis, index) => {
			const height = 120 * index
			const iHeight = 170 + height
			const bHeight = 180 + height
			const biHeight = 184 + height
			const bitHeight = 237.5 + height
			const biTHeight = 175 + height

			img.src = fallbackImage(axis, false)
			ctx.drawImage(img, 20, iHeight, 100, 100)
			img.src = fallbackImage(axis, true)
			ctx.drawImage(img, 680, iHeight, 100, 100)

			ctx.fillStyle = canvas.fgColor
			ctx.fillRect(120, bHeight, 560, 80)

			ctx.fillStyle = axis.left.color
			ctx.fillRect(120, biHeight, 5.6 * resultEffects[axis.id] - 2, 72)
			ctx.fillStyle = axis.right.color
			ctx.fillRect(
				682 - 5.6 * (100 - resultEffects[axis.id]),
				biHeight,
				5.6 * (100 - resultEffects[axis.id]) - 2,
				72
			)

			ctx.fillStyle = canvas.fgColor
			ctx.font = "50px " + general.mainFont

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
			ctx.font = "300 30px " + general.mainFont
			ctx.textAlign = "center"
			ctx.fillText(axis.name + " Axis: " + matchings[index], 400, biTHeight)
		})
	}
}
