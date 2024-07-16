const Todo = require("../models/todo");
// Define router
exports.deletetodo = async (req, res) => {
    try {
        const {id} = req.params.id;
         await Todo.findByIdAndDelete(id);
         res.status(200).json({
            success: true,
            message: "Todo deleted",
        })
    
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
}

