const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const { db, genid } = require("../db/DbUtils")

router.post("/login", async (req, res) => {
    let { account, password } = req.body;
    let { err, rows } = await db.async.all("SELECT * FROM `LOGIN` WHERE `account` = ? AND `password` = ?", [account, password])
    if (err == null && rows.length > 0) {
        res.send({
            code: 200,
            msg: "登录成功",
        })
    } else {
        res.send({
            code: 400,
            msg: "登录失败"
        })
    }
})

module.exports = router