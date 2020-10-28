<template>
  <div class="header-container">
      <i :class="{
        'el-icon-s-unfold' : isCollapse,
        'el-icon-s-fold' : !isCollapse }" @click="isCollClick"></i>
      <span class="header-text">广州未来广告有限公司</span>
    <el-dropdown :hide-on-click="false" class="header-dropdown">
        <!-- <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span> -->
        <div class="header-right">
            <img :src="users.photo" alt="">
            <span>{{users.name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="outClick">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/login'
import bus from '@/utils/globalBus'

export default {
  name: 'AppHeader',
  components: {},
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  data () {
    return {
      users: {
        photo: '',
        name: ''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 获取用户信息
    async getUserProfile () {
      const res = await getUserProfile()
      this.users = res.data
    },
    isCollClick () {
      this.$emit('isCollClick')
    },
    outClick () {
      this.$confirm('是否需要退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
      console.log(1)
    }
  },
  created () {
    this.getUserProfile()
    // 注册总线事件
    bus.$on('profileUser', res => {
      console.log(res)
      this.users.name = res.name
      this.users.photo = res.photo
    })
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.header-container{
    margin-top: 15px;
    .header-text{
        font-size: 14px;
        margin-left: 5px;
    }
    .header-dropdown{
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .header-right{
        display: flex;
        align-items: center;
        img{
            margin-right: 5px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}

</style>
