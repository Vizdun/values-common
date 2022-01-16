const fs = require("fs")

fs.writeFileSync(
	"index.html",
	fs
		.readFileSync("index.html")
		.toString()
		.replace(/\\n\s*/g, "\\n")
)

fs.rmSync("dist", {
	recursive: true,
	force: true,
})
