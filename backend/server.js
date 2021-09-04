const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/reactcrud', {useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('mongodb connection established')
});

const app = express()
app.use(express.json());
app.use(cors());
const port = 3001

//models
const Todo = require('./models/Todo')

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find()
  res.json(todos);
})

app.post('/api/todo/new', async (req, res) => {
	const todoitem = new Todo({
		title: req.body.title
	})
	const todositem = await todoitem.save();
	res.json(todoitem);
});

app.put('/api/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
	todo.title = req.body.title;
	todo.save();
	res.json(todo);
})

app.delete('/api/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
	res.json({result});
})

app.listen(port, () => {
  console.log(` app listening at Port:${port}`)
})
