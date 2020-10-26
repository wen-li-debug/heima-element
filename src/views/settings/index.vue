<template>
  <div class="setting-container">
    <el-card>
      <!-- 面包屑 -->
      <breadcrumb  :breadTitle="title"/>

      <!-- 表单 -->
      <el-row>
        <!-- 表单数据 -->
        <el-col :span="12">
          <el-form
          :model="settingsForm"
          :rules="settingRules"
            ref="settingsRef"
            label-width="100px"
            >
            <el-form-item label="编号">
              {{settingsForm.id}}
            </el-form-item>
            <el-form-item label="手机号码">
              {{settingsForm.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="settingsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="settingsForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="settingsForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 头像 -->
        <el-col :offset="6" :span="4">
          <el-avatar
          shape="square"
          :size="150"
          fit="cover"
          :src="settingsForm.photo">
          </el-avatar>
          <!-- 使用ref来触发input file事件 -->
          <p style="margin-left: 30px" @click="$refs.file.click()">点击修改头像</p>
          <input type="file" hidden ref="file" @change="onChangeFile">
        </el-col>
      </el-row>
    </el-card>

    <!-- 修改图片的对话框 -->
    <el-dialog
      title="修改图片提示"
      :visible.sync="ImgVisible"
      width="30%"
      @opened="onOpendDialog"
      @close="onCloseDialog"
      >
      <div class="previewImg-warp">
        <img
          class="preview"
          :src="previewImg"
          alt=""
          ref="previewImgRef"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataImg" :loading="updataImgLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import breadcrumb from '@/components/breadcrumb/breadcrumb'
import { getUserProfile, updataImg } from '@/api/login'

export default {
  name: 'settingIndex',
  components: {
    breadcrumb
  },
  props: {},
  data () {
    return {
      title: '个人设置',
      ImgVisible: false,
      previewImg: '',
      settingsForm: {
        id: '',
        name: '',
        mobile: '',
        intro: '',
        email: '',
        photo: ''
      },
      settingRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      cropper: null,
      updataImgLoading: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 获取用户信息
    getUserProfile () {
      getUserProfile().then(res => {
        this.settingsForm = res.data
      })
    },
    // 修改头像
    onChangeFile () {
      // 获取input文件元素
      const file = this.$refs.file
      // 获取选中图片的路径
      const blobDate = window.URL.createObjectURL(file.files[0])
      // 将选中的图片路径赋值
      this.previewImg = blobDate

      this.ImgVisible = true
      // 解决选择同一文件不会触发事件的问题,将input中value值清空
      this.$refs.file.value = ''
    },
    // 对话框打开动画结束后执行的函数
    onOpendDialog () {
      /**
       * 图片裁切器必须基于 img 进行初始化
       * 注意： img必须是可见状态才能正常完成初始化
       * 所以在我们对话框中必须在opened中才能img初始化
       */
      // 获取文件元素
      const image = this.$refs.previewImgRef
      // 替换图片路径
      // if (this.cropper) {
      //   this.cropper.replace(this.previewImg)
      //   return
      // }
      // 调用裁切器
      this.cropper = new Cropper(image, {
        // 比例
        aspectRatio: 1,
        // 不能移动抹布
        dragMode: 'none',
        // 不能拉出区域
        viewMode: 1,
        cropBoxResizable: false
      })
    },
    // 对话框关闭动画结束后执行的函数
    onCloseDialog () {
      this.cropper.destroy()
    },
    // 修改用户头像
    updataImg () {
      this.updataImgLoading = true
      // 获取截取好的文件对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)

        // 提交接口修改头像
        updataImg(fd).then(res => {
          this.updataImgLoading = false

          // 关闭对话框
          this.ImgVisible = false

          // 跟新头像
          this.settingsForm.photo = window.URL.createObjectURL(file)

          this.$message({
            type: 'success',
            message: '更换成功'
          })
        })
      })
    }
  },
  created () {
    this.getUserProfile()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.previewImg-warp{
  .preview{
    display: block;
  /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
</style>
