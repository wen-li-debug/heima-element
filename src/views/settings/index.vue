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
          <p style="text-align:center" @click="$refs.file.click()">点击修改头像</p>
          <input type="file" hidden ref="file" @change="onChangeFile">
        </el-col>
      </el-row>
    </el-card>

    <!-- 修改图片的对话框 -->
    <el-dialog
      title="修改图片提示"
      :visible.sync="ImgVisible"
      width="50%"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="ImgVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb/breadcrumb'
import { getUserProfile } from '@/api/login'

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
      }
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
    onChangeFile (value) {
      console.log(value)
      this.ImgVisible = true
      // 解决选择同一文件不会触发事件的问题,将input中value值清空
      this.$refs.file.value = ''
    }
  },
  created () {
    this.getUserProfile()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
