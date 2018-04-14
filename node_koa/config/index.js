module.exports = {
  'host': '127.0.0.1',
  'port': 3001,
  'db': 'mongodb://localhost/nodeKoa',
  'jwt': {
    'key': 'user',
    'expire': '14 days',
    'collection': 'tokens',
    'secret': 'shared-secret'
  },
  "smtp": {
    'user': '**********@qq.com',
    'pass': 'sqwqiezcxtjdbgbb'
  }
}
