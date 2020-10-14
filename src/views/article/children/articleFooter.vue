<template>
  <div class="article-footer">
    <el-card>
        <div slot="header" class="clearfix">
            根据筛选出 {{total}} 条数据
        </div>
        <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            class="table-card">
            <el-table-column
            prop="pubdate"
            label="封面"
            >
              <template slot-scope="scope">
                <img class="scope-img"
                :src="scope.row.cover.images[0]"
                alt=""
                v-if="scope.row.cover.images[0]">
                <img class="scope-img" v-else src="@/assets/image/article/no-cover.gif" alt="">
              </template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题"
            >
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status === 0">草稿</el-tag>
                    <el-tag type="success" v-if="scope.row.status === 1">待审核</el-tag>
                    <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
                    <el-tag type="success" v-if="scope.row.status === 3">审核失败</el-tag>
                    <el-tag type="info" v-if="scope.row.status === 4">已删除</el-tag>
                </template>
            </el-table-column>
            <el-table-column
            prop="pubdate"
            label="发布时间">
            </el-table-column>
            <el-table-column
            label="操作">
             <template>
                <el-button
                size="mini"
                type="primary"
                circle
                icon="el-icon-edit"
                ></el-button>
                <el-button
                size="mini"
                type="danger"
                circle
                icon="el-icon-delete"
                ></el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            background
            @current-change="currentChange" />
    </el-card>
   </div>
</template>
<script>
export default {
  name: 'ArticleFooter',
  components: {},
  props: {
    tableData: {
      type: Array
    },
    total: {
      type: Number
    }
  },
  data () {
    return {
      noImg: '@/assets/image/article/no-cover.gif'
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    currentChange (page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>
<style lang="less" scoped>
.table-card{
    margin-bottom: 20px;
    .scope-img{
      width: 100px;
    }
}
</style>
