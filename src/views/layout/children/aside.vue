<template>
    <el-aside width="auto">
      <el-menu
        :default-active="$route.path"
        class="aside-container"
        background-color="#001D35"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        >
        <el-menu-item class="logo-img">
           <img src="@/assets/image/login/logo_index.png" alt="">
        </el-menu-item>
        <el-menu-item index="/home">
            <i class="iconfont icon-icon_home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="iconfont icon-fabu"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.aside-container{
    height: 100%;
    .iconfont{
        margin-right: 8px;
        padding-left: 3px;
        font-size: 20px;
    }
    .logo-img{
        width: 170px;
        img{
            width: 100%;
        }
    }
}
</style>
