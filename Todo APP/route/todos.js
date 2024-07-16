const express = require("express");
const router = express.Router();
//import controller 
const { createTodo } = require("../controller/createTodo");
const { updatetodo } = require("../controller/updatetodo");
const { deletetodo } = require("../controller/deletetodo");
const { gettodo, gettodoByID } = require("../controller/gettodo");
//define api
router.post("/createTodo", createTodo);
router.get("/gettodo", gettodo);
router.get("/gettodo/:id", gettodoByID);
router.put("/updatetodo/:id", updatetodo);
router.delete("/deletetodo/:id", deletetodo);

module.exports = router;



// in routes u need method path handler