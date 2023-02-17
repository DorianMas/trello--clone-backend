const express = require('express')
const { tasksRouter } = require('./tasks/tasks.routes')
const { Pool } = require('./pool')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/tasks', tasksRouter)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message, status: 500 })
})

app.get('/', (req, res) => {
  res.send('Salut')
})

const PORT = 3000
const connectionString = `postgresql://postgres:4rNFy20XHtVNENHc6xa9@containers-us-west-177.railway.app:6412/railway`

function start() {
  Pool.connect({
    connectionString,
  })
    .then(() => {
      console.log('Connexion à Postgres établie avec succès.')
      app.listen(PORT, () => {
        console.log(`Le serveur écoute sur le port ${PORT}.`)
      })
    })
    .catch((err) => {
      console.error(err)
      setInterval(start, 3000)
    })
}

start()
