'use strict'

class SerializeError extends Error {
  constructor(field, message) {
    console.log('C')
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
    console.log('Q')
    super('Must run validate() before getting validatedData')
  }
}

module.exports = {
  SerializeError: SerializeError,
  SerializeUndefinedError: SerializeUndefinedError,
  SerializeNotValidatedError: SerializeNotValidatedError 
}
