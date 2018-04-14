<template>
  <div class="em-index">
    <div class="itemList">
      item2
    </div>
    <div class="ul-box">
      item2--{{item2}}
    </div>
    <div class="ul-box">
      itemListfn--{{itemListfn}}
    </div>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import * as api from '../../api'
// import VItem1 from './item1.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    // VItem1
  },
  data () {
    return {
      list: {}
    }
  },
  // 该方法会在 页面加载前执行
  async asyncData ({ store, route, _this, params }, callback) {
    let _li = store.itemList
    let res = await api.item.getList({
      params: {
        key: _li
      }
    })
    let _R = {}
    if (res && res.data && res.success) {
      console.log(res.data, '--------------> item2 asyncData')
      _R = { item2: res.data }
    } else {
      _R = { item2: {} }
    }
    // store.commit('itemList/SET_VALUE', _R.itemList)
    callback(null, _R)
    return _R
  },
  mounted () {
  },
  computed: {
    // ...mapGetters('itemList', [
    //   'getItemId'
    // ]),
    // ...mapState([
    //   'itemList'
    // ]),
    itemListfn () {
      return this.$store.state.itemList
    }
  },
  watch: {
  },
  methods: {
    ...mapActions('itemList', [
      'set_value'
    ]),
    editItemId (data) {
      // data.id += ' . '
      let _obj = Object.assign({}, data, {_id: data._id + ' . '})
      this.set_value(_obj)
    }
  }
}
</script>
