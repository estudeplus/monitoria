'use strict'

const startMongo = require('../config/mongo.js')
const express = require('express')
const bodyParser = require('body-parser')

const MonitoringEventModel = require('../models/monitoringEvent.js')
const MonitoringEventSerializer = require('./serializers.js')

const PORT = 3000

const app = express()

app.use(bodyParser());

app.get('/', (req, res) => {
  return res.status(200).send({status: 'ok'})
})

app.post('/monitoring_event', (req, res) => {

  let monitoringEvent = new MonitoringEventSerializer(req.body)

  let valid = monitoringEvent.validate()

  if(valid) {
    monitoringEvent.save()
      .then(() => {
        return res.status(201).send({ success: true })
      })
      .catch((err) => {
        return res.status(500).send(err.message)
      })
  }
  else{
    return res.status(400).send({errors: monitoringEvent.errors()})
  }
})

app.get('/monitoring_event/:id', (req, res) => {
  MonitoringEventModel.findById(req.params.id)
    .then((event) => {
      if(!event) {
        return res.status(404).send({
          error: 'Event not found'
        })
      }

      return res.status(200).send(event)
    })
    .catch((err) => {
      if(err.kind === 'ObjectId') {
        return res.status(400).send(err)
      }

      return res.status(500).send(err)
    })
})


app.put('/monitoring_event/:id', (req, res) => {
  MonitoringEventModel.findById(req.params.id)
    .then((event) => {
      if(!event) {
        return res.status(404).send({
          error: 'Event not found'
        })
      }

      event.place = req.body.place
      event.datetime = req.body.datetime

      event.save((err) => {
        if(err){
          return res.status(400).send(err)
        }
        return res.status(201).send(event)
      })
    })
    .catch((err) => {
      return res.status(500).send(err)
    })
})

app.get('/monitoring_event', (req, res) => {
  MonitoringEventModel.find({}, (err, events) => {
    if(err){
      return res.status(500).send({ err })
    }
    return res.status(200).send(events)
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
