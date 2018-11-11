'use strict'

const Model = use('Model')
const schema = use('Env').get('DB_SCHEMA')

class Token extends Model {

    static get table() {
        return `${schema}.token`
      }
}

module.exports = Token
