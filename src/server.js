'use strict'

const startMongo = require('../config/mongo.js')
const express = require('express')
const bodyParser = require('body-parser')

const MonitoringEventModel = require('../models/monitoringEvent.js')

const PORT = 3000


const app = express()

app.use(bodyParser());

app.get('/', (req, res) => {
  return res.status(200).send({status: 'ok'})
})

app.post('/monitoring_event', (req, res) => {

  let monitoringEvent = MonitoringEventModel(req.body)

  monitoringEvent.save((err) => {

    if(err && err.name === 'ValidationError') {
      return res.status(400).send({ err })
    }

    return res.json({ success: true })

  })

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
