const fs = require("fs")

fs.writeFileSync(
	"public/index.html",
	fs
		.readFileSync("public/index.html")
		.toString()
		.replace(/\\n\s*/g, "\\n")
)

fs.rmSync("dist", {
	recursive: true,
	force: true,
})
