const { genid, db } = require("./DbUtils")

console.log(genid.NextId());
const insert_sql = 'INSERT INTO `LOGIN` (id,account,password) VALUES (?,?,?)'
const insert_params = [genid.NextId(), 'yuki', '123456']

const insert_fun = async()=>{
    const {err,rows} = await db.async.run(insert_sql, insert_params)
    console.log(err);
}
insert_fun()