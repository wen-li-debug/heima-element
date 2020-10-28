<template>
  <div class="articleImg-container" @click="articleClick">
    <el-image
      :src="url"
      fit="cover"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
     <!-- 上传图片的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="imgDialogVisible"
      append-to-body
      >
       <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部" name="whole">全部</el-tab-pane>
        <el-tab-pane label="上传文件" name="Collection">
          <template>
            <input type="file" ref="profileView" @change="changeFile">
            <div class="profileImg">
              <el-image :src="changeImg" alt="" ref="profileImg" class="img"/>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitImg" :loading="profileLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { upLoadImg } from '@/api/upLoadImg'

export default {
  name: 'articleImg',
  components: {},
  props: ['coverImg'],
  data () {
    return {
      url: this.coverImg,
      imgDialogVisible: false,
      profileLoading: false,
      activeName: '',
      changeImg: ''
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    articleClick () {
      // 显示对话框
      this.imgDialogVisible = true
    },
    // 上传文件
    changeFile () {
      // 获取文件
      const file = this.$refs.profileView.files[0]
      // 获取文件url
      const blob = window.URL.createObjectURL(file)
      // 更新url 数据
      this.changeImg = blob
    },
    // 确定上传文件
    onSubmitImg () {
      this.profileLoading = true
      const files = this.$refs.profileView.files[0]
      // 判断是否是点击了上传图片
      if (this.activeName === 'Collection') {
        // 判断是否已经上传了图片
        if (!files) {
          this.$message('请选择图片')
          return
        }
        // 将文件转为formData 格式
        const fd = new FormData()
        fd.append('image', files)
        // 已经有图片上传，发送请求到后台获取新的url
        upLoadImg(fd).then(res => {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          this.url = res.data.url
          this.profileLoading = false
          this.imgDialogVisible = false

          // 将生成的url传给父组件
          this.$emit('updataImg', res.data.url)
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.articleImg-container{
  width: 180px;
  height: 120px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 120px;
  .article-img{
    width: 50px;
    height: 50px;
  }
  .profileImg{
    width: 120px;
    height: 100px;
    border: 1px solid #ccc;
    .img{
      width: 100%;
    }
  }
}
</style>
