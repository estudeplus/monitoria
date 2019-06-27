'use strict'

const startMongo = require('../config/mongo.js')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3000


const app = express()

app.use(bodyParser());

app.get('/', (req, res) => {
  return res.status(200).send({status: 'ok'})
})

app.listen(PORT, async () => {
    try {
        await startMongo()
    } catch(err) {
        console.log(err)
        process.exit(1)
    }

    console.log('Server running on port ' + PORT)
})
