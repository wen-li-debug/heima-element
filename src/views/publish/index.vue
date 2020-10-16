<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
     <el-form ref="form" :model="article" label-width="80px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="article.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="type">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
         >
          <img v-if="article.images" :src="article.images" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish(false)">立即发布</el-button>
        <el-button @click="onPublish(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle } from '@/api/article'

export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型： 0无图，-1自动，1单张，3三张
          images: [] // 图片存放
        },
        channel_id: null
      },
      channels: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
        // type: [
        //   { required: true, message: '请输入封面', trigger: 'blur' }
        // ],
        // channel_id: [
        //   { required: true, message: '请选择频道', trigger: 'blur' }
        // ]
      }
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getArticleChannels()
  },
  mounted () {},
  methods: {
    // 发表
    onPublish (drash) {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        addArticle(this.article, drash).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          const article = {
            title: '',
            content: '',
            cover: {
              type: 0, // 封面类型： 0无图，-1自动，1单张，3三张
              images: [] // 图片存放
            },
            channel_id: null
          }
          this.article = article
        })
      })
    },

    // 频道请求
    getArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.channels
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
