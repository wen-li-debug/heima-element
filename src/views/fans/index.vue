<template>
  <div class="fontColor-container">
    <echarts class="fans-echarts"/>
  </div>
</template>

<script>
import echarts from '@/components/echarts'

export default {
  name: 'fansIndex',
  components: {
    echarts
  },
  props: {},
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
.fans-echarts{
  width: 600px;
  height: 400px;
}
</style>
