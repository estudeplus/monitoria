'use strict'

class SerializeError extends Error {
  constructor(field, message) {
    super(message)
    this.field = field
  }
}

class SerializeUndefinedError extends SerializeError {
  constructor(field) {
    let message = 'value of field is undefined'
    super(field, message)
  }
}

class SerializeNotValidatedError extends Error {
  constructor() {
    super('Must run validate() before getting validatedData')
  }
}

module.exports = {
  SerializeError: SerializeError,
  SerializeUndefinedError: SerializeUndefinedError,
  SerializeNotValidatedError: SerializeNotValidatedError 
}
