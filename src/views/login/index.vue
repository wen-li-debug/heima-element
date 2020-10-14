<template>
  <div class="login">
    <div class="login-logo">
      <img src="../../assets/image/login/logo_index.png" alt="">
    </div>
    <el-form class="login-form" ref="form" :model="users" :rules="rules">
    <el-form-item prop="mobile">
      <el-input v-model="users.mobile" placeholder="请输入用户名"></el-input>
    </el-form-item>
     <el-form-item prop="code">
      <el-input v-model="users.code" placeholder="请输入密码">246810</el-input>
    </el-form-item>
    <el-form-item prop="agree">
      <el-checkbox v-model="users.agree" label="1">我已阅读并同意协议和隐私条件</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="onSubmit" :loading="loginLoading">提交</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    const checkLogin = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('需要勾选协议'))
      }
    }
    return {
      users: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      newUsers: {},
      loginLoading: false,
      // 规则
      rules: {
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正常手机号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码', trigger: 'blur' }
        ],
        agree: [
          { validator: checkLogin, trigger: 'change' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 判断规则
    async onSubmit () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.loginLoading = true
        this.getLogin()
      })
    },
    // 发送登录请求
    async getLogin () {
      try {
        const res = await login(this.users)
        this.loginLoading = false
        const message = res.message
        if (message === 'OK') {
          this.$message({ message: '登录成功', type: 'success' })
          // 获取token
          this.newUsers = res.data.data
          localStorage.setItem('user', JSON.stringify(this.newUsers))
          this.$router.push({ name: 'home' })
        } else {
          this.$message.error('登录失败,账号或者密码错误!')
        }
      } catch (error) {
        console.log(error)
        this.loginLoading = false
        this.$message.error('登录失败,账号或者密码错误!')
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.login{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('../../assets/image/login/login_bg.jpg') no-repeat;
  background-size: cover;  // 已最短的为基准
  .login-logo{
    background-color: #fff;
    width: 300px;
    text-align: center;
    padding: 20px 50px 0 50px;
  }
  .login-form{
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
