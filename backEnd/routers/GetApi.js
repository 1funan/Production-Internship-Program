const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const { db, genid } = require("../db/DbUtils")
const multer = require('multer')
const axios = require('axios')
const path = require('path');
const {processStr} = require("../utils/TempExe")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const update1 = multer({ storage })
router.post('/getData', async (req, res) => {
    const { msg } = req.body
    console.log(msg);
    const DASHSCOPE_API_KEY = 'sk-c9ede30666b046d5b73c4d3f065d48b0';
    const result = await axios({
        method: 'post',
        url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
        headers: {
            'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        data: {
            "model": "qwen-plus",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": `${msg}`
                }
            ]
        }
    })
    console.log(result.data);
    res.send(result.data)
})
router.post('/writeDialog', async (req, res) => {
    const { txt } = req.body
    const insert_sql = "INSERT INTO `ROBOT_TXT` (`id`,`content`) VALUES (?,?)"
    const insert_params = [genid.NextId(), txt]
    let { err, rows } = await db.async.run(insert_sql, insert_params)
    if (!err) {
        res.send({
            code: 200,
            msg: '插入成功'
        })
    } else {
        console.log(err);
    }
})
router.post('/queryDialog', async (req, res) => {
    const select_sql = "SELECT * FROM `ROBOT_TXT`"
    const select_params = []
    let { err, rows } = await db.async.all(select_sql, select_params)
    if (!err) {
        res.send({
            code: 200,
            msg: "查询成功",
            data: rows
        })
        console.log('1');
        console.log(rows);
    } else {
        console.log(err);
    }
})
router.post('/sendArticle', async (req, res) => {
    const { themeValue, titleValue, contentValue } = req.body
    const insert_sql = "INSERT INTO `BLOG` (`id`,`theme`,`title`,`content`) VALUES (?,?,?,?)"
    const insert_params = [genid.NextId(), themeValue, titleValue, contentValue]
    const { err, rows } = await db.async.run(insert_sql, insert_params)
    if (!err) {
        console.log('200');
        res.send({
            code: 200,
            msg: '插入成功'
        })
    } else {
        res.send({
            code: 400,
            msg: '丸辣'
        })
    }
})
router.post('/getCategory', async (req, res) => {
    const select_sql = "SELECT * FROM `BLOG`"
    const select_params = []
    const { err, rows } = await db.async.all(select_sql, select_params)
    if (!err) {
        console.log(rows);
        res.send({
            code: 200,
            msg: "查询成功",
            data: rows
        })
    } else {
        res.send({
            code: 400,
            msg: '丸辣'
        })
    }
})
router.post('/deleteCategory', async (req, res) => {
    const { id } = req.body
    const delete_sql = "DELETE FROM `BLOG` WHERE `id` = (?)"
    const delete_params = [id]
    const { err, rows } = await db.async.run(delete_sql, delete_params)
    if (!err) {
        console.log(rows);
        res.send({
            code: 200,
            msg: "删除成功",
        })
    } else {
        res.send({
            code: 400,
            msg: '丸辣'
        })
    }
})
let fileP = ''
router.post('/uploadImg', update1.single('file'), (req, res) => {
    console.log(req.file);
    console.log(path.join(__dirname, '../', 'public', 'upload', req.file.filename));
    fileP = req.file.filename
})

router.post('/deleteDialog', async (req, res) => {
    const { id } = req.body;
    const delete_sql = "DELETE FROM `ROBOT_TXT` WHERE `id` = (?)"
    const delete_params = [id]
    const { err, rows } = await db.async.run(delete_sql, delete_params)
    if (!err) {
        console.log('111');
        res.send({
            code: 200,
            msg: '删除成功'
        })
    } else {
        res.send({
            code: 400,
            msg: '丸辣'
        })
    }
})
router.post('/carName', async (req, res) => {
    let {conf} = req.body
    conf = conf/100
    if(!fileP){
        res.send({
            code:400,
            msg:'请先上传文件'
        })
    }else{
        let { carName, oldPath2 } = await processStr(fileP,conf)
        res.send({
            code: 200,
            msg: '处理成功',
            data: {
                name:carName,
                path:oldPath2
            }
        })
    }
})

module.exports = router