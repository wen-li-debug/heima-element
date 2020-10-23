<template>
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    breadTitle: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.clearfix{
  margin-bottom: 20px;
}
</style>
