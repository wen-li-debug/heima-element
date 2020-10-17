<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{articelId ? '修改管理' : '发布管理'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
     <el-form ref="form" :model="article" label-width="80px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-tiptap v-model="article.content" :extensions="extensions"/>
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
        <el-button type="primary" @click="onPublish(false)">{{articelId ? '修改' : '立即发布'}}</el-button>
        <el-button @click="onPublish(true)" v-if="!articelId">存为草稿</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getUpdaArticle, updaArticle } from '@/api/article'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList
} from 'element-tiptap'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
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
      articelId: null,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度需要5-30之内', trgger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        // type: [
        //   { required: true, message: '请输入封面', trigger: 'blur' }
        // ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      },
      // 富文本内容
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ]
    }
  },
  watch: {},
  computed: {},
  created () {
    // 获取频道信息
    this.getArticleChannels()

    // 获取需要修改的数据信息
    this.articelId = this.$route.query.id

    if (this.articelId) {
      this.getUpdaArticle(this.articelId)
    }
  },
  mounted () {},
  methods: {
    // 发表
    onPublish () {
      if (this.articelId) {
        this.updaArticle()
      } else {
        this.publishArticle()
      }
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
    },

    // 根据ID获取需要修改的数据
    getUpdaArticle (id) {
      getUpdaArticle(id).then(res => {
        this.article = res.data
      })
    },

    // 修改文章数据
    updaArticle () {
      updaArticle(this.articelId, this.article, false).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push('/article')
      })
    },

    // 发表
    publishArticle () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        addArticle(this.article, false).then(res => {
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
