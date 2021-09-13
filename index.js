var express = require('express') // call express
var data = require('./pokemons.json')
var cors = require('cors')

var app = express() // define our app using express
var port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res) => {
  var pokemons = {}
  for (var index = 0; index < data.length; index++) {
    pokemons[data[index].id] = data[index]
  }
  return res.status(200).send({
    data: Object.values(pokemons),
  })
})

app.post('/', async (req, res) => {
  data.unshift(req.body)
  return res.status(200).send({
    message: 'Success',
  })
})

app.put('/:id', async (req, res) => {
  for (var index = 0; index < data.length; index++) {
    if (data[index].id.toString() === req.params.id) {
      data[index].name = req.body.name
      break
    }
  }
  return res.status(200).send({
    message: 'Success',
  })
})

app.delete('/:id', async (req, res) => {
  var idx = null
  for (var index = 0; index < data.length; index++) {
    if (data[index].id.toString() === req.params.id) {
      idx = index
      break
    }
  }
  data.splice(idx, 1)
  return res.status(200).send({
    message: 'Success',
  })
})

try {
  app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
  })
} catch (error) {
  console.error(`Error occured: ${error.message}`)
}
