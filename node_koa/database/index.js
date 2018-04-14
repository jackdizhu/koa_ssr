
var mongoose = require('mongoose')

const config = require('../config')

mongoose.Promise = global.Promise
mongoose.connect(config.db, {
  server: {
    poolSize: 20
  }
}, (err) => {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message)
    process.exit(1)
  }
})

var Schema = mongoose.Schema

var models = require('./models')

for (var m in models) {
  // Schema.index({ project: 1, create_at: -1 })
  mongoose.model(m, new Schema(models[m]))
}

module.exports = {
  getModel: function (type) {
    return _getModel(type)
  }
}

var _getModel = function (type) {
  return mongoose.model(type)
}
