<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <!-- 文章列表 -->
        <article-item
          v-for="obj in articlesList"
          :key="obj.art_id"
          :articlesInfo="obj"
          @dislikesArcticleFn="dislikesArcticleEv"
          @reportArecleFn="reportArecleEv"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI, dislikesAPI, reportArecleAPI } from '@/api'
import { Notify } from 'vant'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articlesList: [], // 储存文章列表数据
      timestamp: new Date().getTime(), // 时间戳，和上次请求回来的时间戳
      loading: false, // 是否是加载状态
      finished: false, // 是否不再触发 onLoad事件
      refreshing: false
    }
  },
  mounted() {
    // 获取文章列表数据
    this.getArticleListFn()
  },
  methods: {
    // 获取文章列表数据
    async getArticleListFn() {
      const { data: res } = await getArticleListAPI({
        channelId: this.channelId,
        timestamp: this.timestamp
      })
      this.articlesList = res.data.results
      this.timestamp = res.data.pre_timestamp
    },
    // 上拉刷新 , 获取当前频道的文章列表数据
    async onLoad() {
      this.loading = false
      // 防止组件创建就执行一次
      if (this.articlesList.length === 0) return
      this.loading = true
      const { data: res } = await getArticleListAPI({
        channelId: this.channelId,
        timestamp: this.timestamp
      })
      // 请求回来的时间戳为空，不再触发onload事件
      if (!res.data.pre_timestamp) {
        this.loading = false
        // 数据全部加载完成
        this.finished = true
        return
      }
      this.articlesList.push(...res.data.results)
      this.timestamp = res.data.pre_timestamp
      // 加载状态结束
      this.loading = false
    },
    // 下拉刷新文章列表数据,只刷新和展示前十条数据
    async onRefresh() {
      // 是否为加载状态
      this.refreshing = true
      // 清空列表数据
      this.finished = false
      this.getArticleListFn()
      // 将 refreshing 设置为 false，表示处于不加载状态
      this.refreshing = false
    },
    // 自定义事件，对文章发起不感兴趣的请求
    async dislikesArcticleEv(value) {
      try {
        await dislikesAPI(value)
        Notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        Notify({ type: 'danger', message: '反馈失败' })
      }
    },
    // 自定义事件，对文章发起举报的请求
    async reportArecleEv(artId, type) {
      try {
        await reportArecleAPI(artId, type)
        Notify({ type: 'success', message: '举报成功' })
      } catch (error) {
        Notify({ type: 'danger', message: '举报失败' })
      }
    }
  }
}
</script>
