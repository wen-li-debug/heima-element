<template>
  <div class="image-container">
    <el-card>
      <breadcrumb :breadTitle="breadTitle" class="image-bread"/>
      <div class="image-radio" >
        <el-radio-group v-model="pages.collect" @change="onImgChange"  size="mini" >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="primary" size="mini" @click="upLoadDialogVisible = true">点击上传</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :sm="12" :md="6" :lg="4" v-for="item in images" :key="item.id" class="loadImg">
          <el-image :src="item.url" fit="cover" style="height: 100px"/>
          <div class="iconImg">
            <el-button type="warning"
            :icon="item.is_collected ? 'el-icon-star-on': 'el-icon-star-off'"
            circle
            size="mini"
            @click="collectClick(item)"
            :loading="item.loading"
            ></el-button>
            <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            :loading="item.loading"
            @click="delClick(item)"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCunt"
        @current-change="changePage"
        :page-size.sync="pages.per_page"
        :disabled="loading"
        :current-page.sync="page"
        >
      </el-pagination>
    </el-card>

    <!-- 上传图片的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="upLoadDialogVisible"
      width="33%"
      center>
        <el-upload
          class="upload-demo"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="upLoadHeaders"
          :on-success="loadSuccess"
          drag
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb/breadcrumb'
import { getImage, collectImages, deleImages } from '@/api/upLoadImg'
export default {
  name: 'imageIndex',
  components: {
    breadcrumb
  },
  props: {},
  data () {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
      breadTitle: '素材管理',
      images: [],
      upLoadDialogVisible: false,
      pages: {
        collect: false,
        page: 1,
        per_page: 10
      },
      totalCunt: 0,
      page: 1,
      loading: false,
      upLoadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  watch: {},
  computed: {},
  created () {
    this.loadImgs()
  },
  mounted () {},
  methods: {
    loadImgs () {
      this.page = this.pages.page
      this.loading = true
      getImage(this.pages).then(res => {
        // 遍历图片给图片加上loading
        const result = res.data.results
        result.forEach(ele => {
          ele.loading = false
        })
        this.images = result
        this.totalCunt = res.data.total_count
        this.loading = false
      })
    },
    // 切换全部和收藏
    onImgChange () {
      this.pages.page = 1
      this.loadImgs()
    },
    // 图片上传成功
    loadSuccess () {
      this.upLoadDialogVisible = false
      this.loadImgs()
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    // 分页改变页码
    changePage (page) {
      this.pages.page = page
      this.loadImgs()
    },
    // 收藏
    collectClick (item) {
      item.loading = true
      console.log(item)
      collectImages(item.id, { collect: !item.is_collected }).then(res => {
        item.loading = false
        item.is_collected = !item.is_collected
      })
    },
    // 删除
    delClick (item) {
      this.$confirm('是否需要删除图片素材', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'wraning'
      }).then(() => {
        item.loading = true
        deleImages(item.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          item.loading = false
          this.loadImgs()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.image-bread{
  margin-bottom: 20px;
}
.image-radio{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.loadImg{
  position: relative;
  .iconImg{
    position: absolute;
    bottom: 4px;
    left: 5px;
    right: 5px;
    font-size: 20px;
    color: orangered;
    background-color: rgba(240, 240, 240, .5);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
