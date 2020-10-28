<template>
  <div class="publish-container">
    <el-card class="box-card">
     <breadcrumb :breadTitle="articelId ? '修改管理' : '发布管理'" />
     <el-form ref="form" :model="article" label-width="80px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <quillEditor class="editor"/> -->
        <el-tiptap v-model="article.content" :extensions="extensions" placeholder="请输入文章内容" height="350"/>
      </el-form-item>
      <el-form-item label="封面" prop="type">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <template v-if="article.cover.type > 0">
          <article-img
          v-for="(item,index) in article.cover.type"
          :key="item"
          @updataImg="onUpdataImg(index,$event)"
          :coverImg="article.cover.images[index]"
          />
        </template>
      </el-form-item>
      <el-form-item>
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
import breadcrumb from '@/components/breadcrumb/breadcrumb'
import articleImg from './children/articleImg/articleImg'
import { getArticleChannels, addArticle, getUpdaArticle, updaArticle } from '@/api/article'
import { upLoadImg } from '@/api/upLoadImg'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import 'element-tiptap/lib/index.css'

// import { quillEditor } from 'vue-quill-editor'

import {
  // necessary extensions
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
  OrderedList,
  Fullscreen,
  TodoItem,
  TodoList,
  CodeBlock,
  Preview,
  Image
} from 'element-tiptap'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    breadcrumb,
    articleImg
    // quillEditor
  },
  props: {},
  data () {
    const contextValida = (rule, value, callback) => {
      console.log(value)
      if (value === '<p></p>') {
        callback(new Error('内容不能为空'))
      }
      callback()
    }
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
          { required: true, message: '请输入内容', trigger: 'blur' },
          { validator: contextValida }
        ],
        // type: [
        //   { required: true, message: '请输入封面', trigger: 'blur' }
        // ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Fullscreen(),
        new TodoItem(),
        new TodoList(),
        new CodeBlock(),
        new Preview(),
        new Image({
          uploadRequest (file) {
            console.log(file)
            // 创建一个文件上传对象
            const fd = new FormData()
            fd.append('image', file)
            // 发送请求转化图片
            return upLoadImg(fd).then(res => {
              return res.data.url
            })
          }
        })
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

    // 根据ID获取需要修改的数据
    getUpdaArticle (id) {
      getUpdaArticle(id).then(res => {
        this.article = res.data
      })
    },

    // 修改文章数据
    updaArticle () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        updaArticle(this.articelId, this.article, false).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
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
    },
    // 接受cover.image 的url
    onUpdataImg (index, url) {
      console.log(index, url)
      // 获取index和图片的url,给cover.image赋值
      this.article.cover.images[index] = url
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
