const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
    try {
        const response = await Todo.find({});
        res.status(200)
            .json(
                {
                    success: true,
                    data: response,
                    message: 'All todo fetched',
                }
            )


    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: "server error",
            })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });

        if (!todo) {
            res.status(404).json({
                success: false,
                data: todo,
                message: "no data found",
            })
        }
        else {
            res.status(200)
                .json(
                    {
                        success: true,
                        data: todo,
                        message: 'todo fetched by id',
                    }
                )
        }


    } catch (error) {
        console.error(error);

        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: "server error",
            })
    }
}