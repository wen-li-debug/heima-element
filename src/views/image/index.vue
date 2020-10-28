<template>
  <div class="image-container">
    <el-card>
      <breadcrumb :breadTitle="breadTitle" class="image-bread"/>
      <img-list />
    </el-card>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb/breadcrumb'
import imgList from '@/components/imgList/imgList'

export default {
  name: 'imageIndex',
  components: {
    breadcrumb,
    imgList
  },
  props: {},
  data () {
    return {
      breadTitle: '素材管理'
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
.image-bread{
  margin-bottom: 20px;
}
</style>
