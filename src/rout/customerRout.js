const customerController =  require("../controller/customerController");

const customer = (app)=>{
   app.get("/customer/get", customerController.getList);
   app.post("/customer/insert", customerController.insert);
   app.delete("/customer/delete/:id", customerController.remove);
   app.put("/customer/update/:id",customerController.update);
}

module.exports = customer