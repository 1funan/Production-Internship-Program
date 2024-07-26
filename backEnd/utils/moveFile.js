const fs = require('fs').promises;
const path = require("path")
async function moveFile(oldPath, newPath) {
    try {
        const newDir = path.dirname(newPath);
        await fs.mkdir(newDir, { recursive: true });
        await fs.rename(oldPath, newPath);
        console.log('200');
    } catch (err) {
        console.log("400");
        console.error(err);
    }
}
module.exports = { moveFile }