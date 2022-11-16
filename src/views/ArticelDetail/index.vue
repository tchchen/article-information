<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()" />
    <!-- 文章加载中 -->
    <van-loading color="#0094ff" v-if="Object.keys(detailObj).length === 0">
      文章加载中...
    </van-loading>
    <div v-else>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{ detailObj.title }}</h1>

        <!-- 文章作者的信息 -->
        <van-cell
          center
          :title="detailObj.aut_name"
          :label="timeAgo(detailObj.pubdate)">
          <template #icon>
            <img :src="detailObj.aut_photo" alt="" class="avatar" />
          </template>
          <template #default>
            <div @click="cancelFollowOrFollow">
              <van-button type="info" size="mini" v-if="detailObj.is_followed"
                >已关注</van-button
              >
              <van-button icon="plus" type="info" size="mini" plain v-else>
                关注
              </van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div class="art-content" v-html="detailObj.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞 -->
        <div class="like-box" @click="likeOrDislikeArticle">
          <van-button
            icon="good-job"
            type="danger"
            size="small"
            v-if="detailObj.attitude === 1">
            已点赞
          </van-button>
          <van-button icon="good-job-o" type="danger" plain size="small" v-else>
            点赞
          </van-button>
        </div>
      </div>
      <!-- 文章评论区域 -->
      <div class="commentList">
        <CommentList> </CommentList>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import {
  getArticleDetailsAPI,
  cancelFollowAPI,
  followAuthorAPI,
  likeArticleAPI,
  dislikeArticleAPI
} from '@/api'
import CommentList from './CommentList.vue'

export default {
  name: 'Detail',
  data() {
    return {
      detailObj: {}, // 文章详情
      timeAgo, // 注册处理时间的方法
      isLoading: false
    }
  },
  mounted() {
    // 获取文章详情
    this.getArticleDetails()
  },
  components: {
    CommentList
  },
  methods: {
    // 获取文章详情
    async getArticleDetails() {
      const { data: res } = await getArticleDetailsAPI(
        this.$route.query.articelId
      )
      this.detailObj = res.data
    },
    // 取消关注或关注作者
    async cancelFollowOrFollow() {
      if (this.detailObj.is_followed) {
        // 如果已经关注了作者，则取消关注
        await cancelFollowAPI(this.detailObj.aut_id)
        this.detailObj.is_followed = false
      } else {
        // 如果没有关注了作者，则关注
        await followAuthorAPI(this.detailObj.aut_id)
        this.detailObj.is_followed = true
      }
    },
    // 对文章点赞或取消点赞
    async likeOrDislikeArticle() {
      if (this.detailObj.attitude <= 0) {
        // 如果没有点赞，则点赞
        await likeArticleAPI(this.detailObj.art_id)
        this.$set(this.detailObj, 'attitude', 1)
      } else {
        // 如果点赞了，则取消点赞
        await dislikeArticleAPI(this.detailObj.art_id)
        this.$set(this.detailObj, 'attitude', 0)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 14px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.commentList {
  padding-bottom: 46px;
}
// 加载中样式
.van-loading {
  text-align: center;
  padding-top: 100px;
}
</style>
