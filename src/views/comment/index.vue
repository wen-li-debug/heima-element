<template>
  <div class="comment-container">
    <el-card>
      <!-- 面包屑 -->
      <breadcrumb :breadTitle="title"/>
      <!-- 表格 -->
       <el-table
        :data="commentsData"
        border
        stripe
        class="comment-table"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.comment_status ? '正常' : '关闭'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.loading"
              @change="onChangeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages.page"
        :page-sizes="[10, 15, 20]"
        :page-size.sync="pages.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
        :disabled="loading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb/breadcrumb'
import { getArticle, updaCommentStatus } from '@/api/article'

export default {
  name: 'commentIndex',
  components: {
    breadcrumb
  },
  props: {},
  data () {
    return {
      title: '评论管理',
      currentPage: 1,
      commentsData: [],
      totalCount: 0,
      loading: false,
      pages: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      }
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    // 每页显示的条数
    handleSizeChange (value) {
      this.pages.per_page = value
      this.getArticle()
    },
    // 跳转的页码
    handleCurrentChange (value) {
      this.pages.page = value
      this.getArticle()
    },
    // 获取评论数据
    getArticle () {
      this.loading = true
      getArticle(this.pages).then(res => {
        const result = res.data.results
        console.log(res)
        // 添加loading用于禁用按钮
        result.forEach(ele => {
          ele.loading = false
        })
        this.commentsData = result
        this.totalCount = res.data.total_count
        this.loading = false
      })
    },
    // 改变评论状态
    onChangeStatus (item) {
      item.loading = true
      console.log(item.loading)
      const articleId = item.id.toString()
      console.log(articleId)
      updaCommentStatus(articleId, item.comment_status).then(res => {
        item.loading = false
        this.$message({
          type: 'success',
          message: item.comment_status ? '开启文章评论成功' : '关闭文章评论成功'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.comment-table{
  margin-bottom: 30px;
}
</style>
