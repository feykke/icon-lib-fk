const fs = require('fs')
const $ = require("cheerio")

const directories = ["outline", "solid", "two-tone"]
let errs = 0

directories.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
        const viewBox = $.load(fs.readFileSync(`${dir}/${file}`))("svg")
            .attr("viewBox")
        if (viewBox !== "0 0 24 24") {
            console.error(
                `Error: \`${dir}/${file}\` has a viewBox of \x1b[31m\`${viewBox}\`\x1b[0m`
            )
            errs++
        }
    })
})

if (errs > 0) {
    process.exit(1)
} else {
    console.log("Test passed!")
}

