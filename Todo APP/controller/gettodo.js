const Todo = require("../models/todo");

// Define router
exports.gettodo = async (req, res) => {
    try {
        //fetch all todo item from database
        const toDos = await Todo.find({});
        //   response
        res.status(200).json({
            success: true,
            data: toDos,
            message: "Entire data is fetched",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
}


exports.gettodoByID = async (req, res) => {
    try {
        //extraxt todo item by id
        const id = req.params.id;
        const todo = await Todo.findById(id);

        //data for given id  not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                "msg": "Data Not Found with the given ID",
            })
        }
        //data for given id found
        res.status(200).json({
            success: true,
            data: todo,
            message: `todo ${id} data successfully fetched`,
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
}