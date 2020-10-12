<template>
  <div class="layout-container">
      <el-container class="container">
        <app-aside />
        <el-container>
            <el-header class="layout-header">
                <app-header />
            </el-header>
            <el-main class="layout-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './children/aside.vue'
import AppHeader from './children/header.vue'

export default {
  name: 'Layout',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.container{
    height: 100vh;
    .layout-header{
        border-bottom: 1px solid #666;
    }
    .layout-main{
        background-color: #eee;
    }
}
</style>
