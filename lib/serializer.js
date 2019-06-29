'use strict'

const { SerializeUndefinedError  } = require('./exceptions.js')
const { SerializeNotValidatedError } = require('./exceptions.js')

class Serializer {

  constructor(data, instance) {
    if(new.target === Serializer) {
      throw new TypeError("Cannot construct `Serializer` instances directly");
    }
    this._model = this.model()
    this._fields = this.fields()
    this._errors = {}
    this.data = {}
    this._fields.forEach((field) => {
      this.data[field] = data[field]
    })

    this._validatedData = {} 
    this._instance = instance
  }

  model() {
    throw new TypeError("You must override method `model`");
  }

  fields() {
    throw new TypeError("You must override method `fields`");
  }

  validate() {
    var valid = null
    try {
      this._fields.forEach((field) => {
        if(this.data[field] === undefined) {
          throw new SerializeUndefinedError(field)
        }
        this._validatedData[field] = this.data[field]
        valid = true
      })
    } catch(err) {
      console.log(err)
      this._errors[err.field] = err.message
      valid = false
    }

    return valid
  }
  validatedData() {
    if(Object.getOwnPropertyNames(this._validatedData).length === 0) {
      throw new SerializeNotValidatedError()
    }
    return this._validatedData
  }
  errors() {
    return this._errors
  }
  save() {
    if(this._instance === undefined) {
      this._instance = this._model(this._validatedData)
    }
    else {
      this._fields.forEach((field) => {
        this._instance[field] = this._validatedData[field]
      })
    }

  return this._instance.save()
  }
}

module.exports = Serializer 
