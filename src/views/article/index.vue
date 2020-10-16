<template>
  <div class="">
      <article-top :form="form" @onSubmit="onSubmit" :pages="pages" :channels="channels" :loading="loading"/>
      <article-footer :tableData="tableData" @currentChange="currentChange" :total="total" :loading="loading" @getDelArticle="getDelArticle"/>
  </div>
</template>

<script>
import ArticleTop from './children/articleTop'
import ArticleFooter from './children/articleFooter'
import { getArticle, getArticleChannels, getDelArticle } from '@/api/article.js'

export default {
  name: 'Acticle',
  components: {
    ArticleTop,
    ArticleFooter
  },
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      pages: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      total: 0,
      tableData: [],
      channels: [],
      loading: false
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getArticle()
    this.getArticleChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      this.getArticle()
    },
    // 获取table数据请求
    async getArticle () {
      this.loading = true
      const res = await getArticle(this.pages)
      this.tableData = res.data.results
      this.total = res.data.total_count
      this.loading = false
    },

    // 获取文章频道数据请求
    async getArticleChannels () {
      const res = await getArticleChannels()
      this.channels = res.data.channels
    },

    // 换行触发的事件
    currentChange (page) {
      this.pages.page = page
      console.log(this.pages)
      this.getArticle()
    },
    // 删除数据
    getDelArticle (obj) {
      console.log(obj)
      this.$confirm('是否需要删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await getDelArticle(obj.iid)
        this.$message({ type: 'success', message: '删除成功' })
        this.pages.page = obj.page
        this.getArticle()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
