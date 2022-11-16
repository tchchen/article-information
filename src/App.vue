<template>
  <div id="app">
    <!-- 除了exclude里对应的组件name属性，其它都缓存 -->
    <keep-alive exclude="Search,SearchResult,Detail,UserEdit,ReadingHistory">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
