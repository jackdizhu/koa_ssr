module.exports = {
  'host': '127.0.0.1',
  'port': 3001,
  'db': 'mongodb://localhost/nodeKoa',
  'jwt': {
    'key': 'user',
    'expire': '14 days',
    'collection': 'tokens',
    'secret': 'c55416ad4470e354e22a70286f81e741'
  },
  'smtp': {
    'user': '**********@qq.com',
    'pass': 'sqwqiezcxtjdbgbb'
  }
}
