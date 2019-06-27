const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonitoringEventSchema = new Schema({
  studentId: { type: String, required: true },
  monitorId: { type: String, required: true },
  discipline: { 
    id: { type: String, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true }
  },
  place: { type: String, required: true },
  datetime: { type: Date, required: true },
  __v: { type: Number, select: false },
}, { collection: 'monitoringEvent' });

module.exports = mongoose.model('MonitoringEventModel', MonitoringEventSchema);
