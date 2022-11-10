<template>
  <div>
    <!-- 二级路由 -->
    <div class="child-router">
      <router-view></router-view>
    </div>
    <!-- 标签栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.child-router {
  padding-bottom: 50px;
}
</style>
