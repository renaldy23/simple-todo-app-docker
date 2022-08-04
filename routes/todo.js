const express = require('express')
const router = express.Router()

const { Todo } = require('../models')

router.get('/', async (req, res) => {
  const todo = await Todo.findAll().catch((err) => {
    console.log(err)
  })
  return res.json({
    status: 'Success!',
    data: todo,
  })
})

router.post('/todo', async (req, res) => {
  const note = req.body.note
  const todo = await Todo.create({
    note: note,
    done: false,
  })

  return res.json({
    status: 'Success!',
    data: {
      id: todo.id,
      note: todo.note,
      done: todo.done,
    },
  })
})

router.put('/todo/:id', async (req, res) => {
  const id = req.params.id
  const getTodo = await Todo.findByPk(id)

  await Todo.update(
    {
      done: !getTodo.done,
    },
    {
      where: {
        id: id,
      },
    },
  ).then(async (result) => {
    res.json({
      status: 'update successfully!',
      data: await Todo.findByPk(id),
    })
  })
})

router.delete('/todo/delete/:id', async (req, res) => {
  const id = req.params.id
  await Todo.destroy({
    where: {
      id: id,
    },
  })

  return res.json({
    status: 'delete successfully!',
  })
})

module.exports = router
