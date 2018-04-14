module.exports = {
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
