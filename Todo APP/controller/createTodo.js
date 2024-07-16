// Import the model
const Todo = require("../models/todo");

// Define router
exports.createTodo = async (req, res) => {
    try {
        // Extract title and description from request body
        const { title, description } = req.body;
        // Create a new todo object(from the todo model) and insert in the database 
        const response = await Todo.create({ title, description });
        // Send a JSON response with a success flag
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry created successfully"
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
