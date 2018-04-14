<template>
  <div class="em-index">
    <div class="itemList" @click="editItemId(itemList)">
      item1--{{getItemId}}
    </div>
    <div class="ul-box">
      {{itemList}}
    </div>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import * as api from '../../api'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      list: {}
    }
  },
  // 该方法会在 页面加载前执行
  asyncData ({ store, route, _this, callBack }) {
    return new Promise((resolve, reject) => {
      let _li = store.itemList
      api.item.getList({
        params: {
          key: _li
        }
      }).then((res) => {
        if (res && res.data && res.success) {
          // 通过 store.commit 保存到vuex 共享数据
          store.commit('itemList/SET_VALUE', res.data || {})
          resolve(res.data)
        } else {
          resolve({})
        }
      })
    })
  },
  mounted () {
  },
  computed: {
    ...mapGetters('itemList', [
      'getItemId'
    ]),
    ...mapState([
      'itemList'
    ]),
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
