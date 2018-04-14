
module.exports = {
  user: {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    ext: {
      type: Object
    }
  },
  file: {
    name: {
      type: String,
      required: true
    },
    nowName: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    ext: {
      type: Object
    }
  }
}
