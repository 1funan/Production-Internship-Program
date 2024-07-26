const { exec } = require('child_process');
const path = require("path")
const { db, genid } = require("../db/DbUtils")
const { moveFile } = require("./moveFile")
// const i = "AUDi.jpg"
// const j = 0.6
const { removeAnsiEscapeCodes } = require("./processAscii")
const exe_img = (input, conf) => {
    const command = `python "D:/yolov8Car/predict.py" ${input} ${conf}`
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (!err) {
                resolve(stdout)
            } else {
                reject(err)
            }
        })
    })
}
const processStr = async (input, conf) => {
    const resultPath = /Results saved to (.*)$/m;
    const filePath = path.join(__dirname, '../', 'public', 'upload', input)
    const result = await exe_img(filePath, conf)
    const oldPath = removeAnsiEscapeCodes(result.match(resultPath)[1])
    const indexY = result.indexOf(',')
    const newStr = result.slice(0, indexY) + " ," + result.slice(indexY + 1)
    const newStrList = newStr.split(' ')
    const newIndex = newStrList.indexOf(',')
    let indexStr = ''
    for (let i = newIndex; i > 0; i--) {
        if (newStrList[i] == '1') {
            indexStr = i
            break
        }
    }
    const oldPath2 = path.join(oldPath,input)
    const carName = newStrList.slice(indexStr + 1, newIndex).join('-')
    const newPath = path.join(__dirname, '../', 'public', oldPath, input)
    const insert_sql = "INSERT INTO `CAR` (`id`,`path`,`name`,`image_path`) VALUES (?,?,?,?)"
    const insert_params = [genid.NextId(), newPath, carName, oldPath2]
    const { err, rows } = await db.async.run(insert_sql, insert_params)
    const oldPath1 = path.join(__dirname,'../' ,oldPath, input)
    console.log(oldPath1);
    if (!err) {
        console.log("200");
        await moveFile(oldPath1, newPath)
        return {carName,oldPath2}
    } else {
        console.log("400");
    }
}
// processStr(i,j)
module.exports = { processStr }