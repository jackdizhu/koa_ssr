<template>
  <div class="em-index">
    <div class="itemList" @click="editItemId(itemList)">
      itemList--{{itemList._id}}
    </div>
    <p>list--{{list}}</p>
    <div class="ul-box">
      {{itemList}}
    </div>
    <div class="ul-box">
      {{itemListfn}}
    </div>
    <p>-------------------</p>
    <v-item1></v-item1>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import * as api from '../../api'
import VItem1 from './item1.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
let beforeCreate = {}
export default {
  name: 'index',
  components: {
    VItem1
  },
  data () {
    return {
      itemList: {},
      list: {
        beforeCreate: beforeCreate,
        created: '',
        beforeMount: '',
        mounted: ''
      }
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
      console.log(res.data, '--------------> itemList asyncData')
      _R = { itemList: res.data }
    } else {
      _R = { itemList: {} }
    }
    store.commit('itemList/SET_VALUE', _R.itemList)
    callback(null, _R)
    return _R
  },
  // el 和 data 并未初始化
  beforeCreate () {
    beforeCreate = 'beforeCreate'
    console.log('beforeCreate')
  },
  // 完成了 data 数据的初始化，el没有
  created () {
    this.list.created = 'created'
    console.log('created')
  },
  // 完成了 el 和 data 初始化
  beforeMount () {
    this.list.beforeMount = 'beforeMount'
    console.log('beforeMount')
  },
  // 完成挂载
  mounted () {
    this.list.mounted = 'mounted'
    console.log('mounted')
  },
  computed: {
    // ...mapGetters('itemList', [
    //   'getItemId'
    // ]),
    // ...mapState([
    //   'itemList'
    // ]),
    itemListfn () {
      return this.itemList
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
