<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar fixed>
      <template #left>
        <img class="img_left" src="@/assets/logo1.png" color="#fff" alt="" />
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" />
      </template>
    </van-nav-bar>
    <!-- 频道切换 -->
    <div class="main">
      <van-tabs
        v-model="channelId"
        color="orange"
        sticky
        offset-top="1.26667rem">
        <van-tab
          v-for="chal in channelList"
          :title="chal.name"
          :key="chal.id"
          :name="chal.id">
          <ArticleList :channelId="channelId" />
        </van-tab>
        <van-icon
          class="tab-icon-plus"
          name="plus"
          size="0.48rem"
          color="#000" />
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'

export default {
  name: 'home',
  components: {
    ArticleList
  },
  data() {
    return {
      channelList: [], // 储存所有频道
      articlesList: [], // 储存文章数据
      pre_timestamp: null, // 储存上次文章数据请求回来的时间戳
      channelId: 0
    }
  },
  mounted() {
    this.getAllChannel() // 获取用户选择的频道
    // this.getArticleList() // 获取推荐频道的文章
  },
  methods: {
    // 获取用户选择的频道
    async getAllChannel() {
      const { data: res } = await getUserChannelAPI()
      this.channelList = res.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .img_left {
  width: 3rem;
}
/deep/ .tab-icon-plus {
  position: fixed;
  width: 30px;
  height: 30px;
  z-index: 999;
  display: inline-block;
  right: 0;
  color: red;
}
.main {
  padding-top: 44px;
}
</style>
