<template>
  <div class="articleTop">
    <el-card>
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item label="状态">
                <el-radio-group v-model="pages.status">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                    <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="pages.channel_id" placeholder="请选择">
                    <el-option label="全部" :value="null"></el-option>
                    <el-option v-for="item in channels" :label="item.name" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker
                    v-model="rangData"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="loading">筛选</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleTop',
  components: {},
  props: {
    form: {
      type: Object
    },
    pages: {
      type: Object
    },
    channels: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      rangData: null
    }
  },
  watch: {
    rangData (newValue) {
      this.pages.begin_pubdate = newValue ? newValue[0] : null
      this.pages.end_pubdate = newValue ? newValue[1] : null
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      this.$emit('onSubmit')
    }
  }
}
</script>
<style lang="less" scoped>
.articleTop{
    margin-bottom: 20px;
}
</style>
