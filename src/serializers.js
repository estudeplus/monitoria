const Serializer = require('../lib/serializer.js')
const MonitoringEventModel = require('../models/monitoringEvent.js')

class MonitoringEventSerializer extends Serializer{
  model() {
    return MonitoringEventModel
  }
  fields() {
    return ['studentsIds', 'monitorId', 'discipline', 'place', 'datetime']
  }
}

module.exports = MonitoringEventSerializer
