<template>
  <div class="header-container">
      <i class="el-icon-s-fold"></i>
      <span class="header-text">广州未来广告有限公司</span>
    <el-dropdown :hide-on-click="false" class="header-dropdown">
        <!-- <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span> -->
        <div class="header-right">
            <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=682895161,2056544872&fm=111&gp=0.jpg" alt="">
            <span>用户昵称</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
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
