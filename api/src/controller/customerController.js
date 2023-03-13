const con = require("../config/customerConfig")

const getList = (req, res)=>{
    con.query("SELECT * FROM customer", (error, rows) => {
        res.json({
            list : rows
        })
        console.log(rows)
    })
}

const insert = (req, res)=>{
    var queryInsert = "INSERT INTO customer(id, name,gender, DOB, address) VALUES(?, ?, ?, ?, ?)";
    var body = req.body;
    con.query(queryInsert, [body.id, body.name, body.gender, body.DOB, body.address], (erorr, rows)=>{
        res.json({
            statusbar : 'OKAY'
        })  
    })
}

const remove = (req, res) => {
    console.log(req.params.id);
    con.query("DELETE FROM customer WHERE id = "+req.params.id, (error, rows)=>{
        if(error){
            res.json({
                error : true,
                message : error.message
            })
        }else{
            res.json({
                statusbar : "Okay",
                message : rows
            })
        }
    })
}
const update = (req, res)=>{
    var body = req.body;
    var id = req.params.id;
    console.log(body)
    console.log(id)
    var updateQuery = "UPDATE customer SET name = ?, gender = ?, DOB = ?, address = ?, is_active = ? WHERE id = "+id;
    con.query(updateQuery, [body.name, body.gender, body.DOB, body.address, body.is_active], (error, result)=>{
            if(error) {
                res.json({
                    error : true,
                    message : error.message,
                    data : result
                })
            }else{
                res.json({
                    data : result
                })
            }
    })
}
module.exports = {
    getList,
    insert,
    remove,
    update
}