<template>
  <div class="main">
    <van-nav-bar
      fixed
      title="阅读历史"
      left-arrow
      @click-left="$router.back()" />
    <!-- 阅读文章的历史列表 -->
    <div class="historyList">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad">
        <div
          class="cell"
          v-for="obj in readingHisList"
          :key="obj.art_id"
          @click="viewArticelDetails(obj.art_id)">
          <div class="list_top">
            <div class="top_left">
              <!-- 单张图片 -->
              <div v-if="obj.cover.type === 1">
                <img :src="images" alt="" />
              </div>
              <!-- 多张图片 -->
              <div v-if="obj.cover.type > 1">
                <img
                  v-for="(imgurl, index) in obj.cover.images"
                  :src="imgurl"
                  :key="index"
                  alt="" />
              </div>
            </div>
            <div class="top_right">
              <span>{{ obj.title }} </span>
            </div>
          </div>
          <div class="list_bottom">
            <span>发布时间：{{ handleTime(obj.pubdate) }}</span>
            <span>作者：{{ obj.aut_name }}</span>
            <span>评论数量：{{ obj.comm_count }}</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getReadHistoryAPI } from '@/api'
import dayjs from 'dayjs'

export default {
  name: 'ReadingHistory',
  mounted() {
    this.getReadingList()
  },
  data() {
    return {
      readingHisList: [], // 储存阅读历史数据
      total: 0,
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    // 获取阅读文章记录
    async getReadingList() {
      const res = await getReadHistoryAPI(1, 10)
      this.readingHisList = res.data.data.results
      this.total = res.data.data.total_count
    },
    // 上拉获取更多
    async onLoad() {
      // 如果把数据都请求回来，不再触发onLoad事件
      if (this.readingHisList.length === this.total) {
        this.loading = false
        this.finished = true
        return
      }
      this.page++
      if (this.readingHisList.length === 0) {
        this.loading = false
        return
      }
      // 获取更多阅读记录
      const { data: res } = await getReadHistoryAPI({ page: this.page })
      this.readingHisList.push(...res.data.results)
      this.loading = false
    },
    // 查看文章详情
    viewArticelDetails(artId) {
      this.$router.push({ path: `/articel_detail/?articelId=${artId}` })
    },
    handleTime(tiem) {
      const newTiem = dayjs(tiem).format('YYYY-MM-DD HH:mm')
      return newTiem
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
.historyList {
  padding-top: 46px;
  .cell {
    padding: 5px;
    .list_top {
      display: flex;
      justify-content: space-between;
      .top_left {
        border-radius: 10px;
        img {
          width: 80px;
        }
        img:first-child {
          margin-right: 5px;
        }
      }
      // #1e80ff
      .top_right {
        flex: 1;
        padding: 10px 0 10px 10px;
        border: 1px solid #1e80ff;
        border-radius: 10px;
        font-size: 14px;
      }
    }
    .list_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      font-size: 10px;
      color: rgb(84, 85, 85);
    }
  }
}
</style>
