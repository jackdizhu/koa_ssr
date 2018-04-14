<template>
  <div id="app">
    <div class="em-layout">
      index
      <p>
        <router-link to="/itemList" class="link">itemList</router-link>
      </p>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
}
</style>

