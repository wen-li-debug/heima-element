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
              @change="onChangeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1,
      commentsData: []
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    handleSizeChange (value) {
      console.log(value)
    },
    handleCurrentChange (value) {
      console.log(value)
    },
    getArticle () {
      getArticle({
        response_type: 'comment'
      }).then(res => {
        this.commentsData = res.data.results
      })
    },
    // 改变评论状态
    onChangeStatus (item) {
      const newStatus = !item.comment_status
      updaCommentStatus(item.id, newStatus).then(res => {
        console.log(res)
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
