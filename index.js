var express = require('express') // call express
var data = require('./pokemons.json')
var cors = require('cors')

var app = express() // define our app using express
var port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

var pokemons = {}
for (var index = 0; index < data.length; index++) {
  pokemons[data[index].id] = data[index]
}
var pokemonsMapped = Object.values(pokemons)

app.get('/', async (req, res) => {
  return res.status(200).send({
    data: pokemonsMapped,
  })
})

app.post('/', async (req, res) => {
  pokemonsMapped.unshift(req.body)
  return res.status(200).send({
    message: 'Success',
  })
})

app.put('/:id', async (req, res) => {
  for (var index = 0; index < pokemonsMapped.length; index++) {
    if (pokemonsMapped[index].id.toString() === req.params.id) {
      pokemonsMapped[index].name = req.body.name
      break
    }
  }
  return res.status(200).send({
    message: 'Success',
  })
})

app.delete('/:id', async (req, res) => {
  var idx = null
  for (var index = 0; index < pokemonsMapped.length; index++) {
    if (pokemonsMapped[index].id.toString() === req.params.id) {
      idx = index
      break
    }
  }
  pokemonsMapped.splice(idx, 1)
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
