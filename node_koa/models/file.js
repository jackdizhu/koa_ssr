'use strict'

// const config = require('../config')

const dbHandel = require('../database/index')
const FileModel = dbHandel.getModel('file')

exports.insert = function ({ name, size, nowName, date }) {
  const file = new FileModel()

  file.name = name
  file.nowName = nowName
  file.size = size
  file.date = date

  return file.save()
}

exports.getByName = function (fileName) {
  return FileModel.findOne({ name: fileName })
}

exports.getById = function (fileId) {
  return FileModel.findById(fileId)
}

exports.find = function (query, opt) {
  return FileModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return FileModel.findOne(query, {}, opt)
}
