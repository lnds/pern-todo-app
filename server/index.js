const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


const PORT = 3001

//middleware
app.use(cors())
app.use(express.json())


//ROUTES//


//CRUD API

//create a todo

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo ORDER BY todo_id"
        )
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        )
        res.json(todo.rows[0])
    } catch (err) {
        console.log(err)

    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        )
        res.json("Todo was updated")
    } catch (err) {
        console.log(err)

    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        )
        res.json("todo was deleted")
    } catch (err) {
        console.error(err)

    }
})

app.listen(PORT, () => {
    console.log("servidor iniciao en puerto " + PORT)
})