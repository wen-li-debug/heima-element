<template>
  <div class="">
      <article-top :form="form" @onSubmit="onSubmit" :pages="pages" :channels="channels"/>
      <article-footer :tableData="tableData" @currentChange="currentChange" :total="total"/>
  </div>
</template>

<script>
import ArticleTop from './children/articleTop'
import ArticleFooter from './children/articleFooter'
import { getArticle, getArticleChannels } from '@/api/article.js'

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
        channel_id: null
      },
      total: 0,
      tableData: [],
      channels: []
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
      const res = await getArticle(this.pages)
      this.tableData = res.data.results
      this.total = res.data.total_count
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
    }
  }
}
</script>
<style lang="less" scoped>
</style>
