<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed />
    </div>
    <!-- 搜索结果内容 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad">
      <article-item
        :isShowFeedBackBtn="isShowFeedBackBtn"
        v-for="obj in articlesList"
        :key="obj.art_id"
        :articlesInfo="obj"></article-item>
    </van-list>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  data() {
    return {
      page: 1, // 页码
      prePage: 10, // 每页展示多少条数据
      total: 0,
      articlesList: [], // 文章列表
      loading: false,
      finished: false,
      isShowFeedBackBtn: false // 在搜索结果的文章不显示 反馈按钮
    }
  },
  mounted() {
    this.getSearchResultList()
  },
  methods: {
    // 获取搜索结果的文章数据
    async getSearchResultList() {
      const keywords = this.$route.query.keywords // 获取搜索关键字
      const { data: res } = await searchResultAPI({
        pages: this.page,
        prePages: this.prePage,
        keywords
      })
      this.articlesList = res.data.results
    },
    // 上拉获取更多搜索结果
    async onLoad() {
      if (this.articlesList.length === 0) return
      this.page++
      this.loading = true
      const keywords = this.$route.query.keywords // 获取搜索关键字
      const { data: res } = await searchResultAPI({
        pages: this.page,
        prePages: this.prePage,
        keywords
      })
      if (res.data.results.length === 0) {
        this.loading = false
        this.finished = true
        return
      }
      this.articlesList.push(...res.data.results)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
