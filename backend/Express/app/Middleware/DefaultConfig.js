'use strict'

class DefaultConfig {
  async handle({ request }, next) {
    request.request.headers['accept'] = 'application/json'
    await next()
  }
}

module.exports = DefaultConfig
