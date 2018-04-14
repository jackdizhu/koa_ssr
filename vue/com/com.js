const _storage = localStorage
export default {
  getItem: (item) => {
    return _storage.getItem(item)
  },
  setItem: (item, str) => {
    return _storage.setItem(item, str)
  },
  removeItem: (item) => {
    return _storage.removeItem(item)
  }
}
