<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad">
      <!-- 评论列表 -->
      <div class="cmt-list" v-for="obj in commentList" :key="obj.com_id">
        <!-- 评论的 Item 项 -->
        <div class="cmt-item">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div
              class="cmt-header-right"
              @click="likeOrDislike(obj, obj.com_id)">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="obj.is_liking" />
              <van-icon name="like-o" size="16" color="gray" v-else />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
        </div>
      </div>
    </van-list>
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShowComtInp">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="prepareComment">发表评论</div>
      <div class="icon-box">
        <van-badge :content="total > 99 ? '99+' : total">
          <van-icon
            name="comment-o"
            size="0.53333334rem"
            @click="commentClickFn" />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>
    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else @click="prepareComment">
      <textarea
        placeholder="友善评论、理性发言、阳光心灵"
        v-focus
        v-model.trim="commentText"
        @blur="blurInp"></textarea>
      <van-button type="default" @click="sendComment">发布</van-button>
    </div>
  </div>
</template>

<script>
import {
  getArticleCommentAPI,
  likeArticleCommentAPI,
  dislikeArticleCommentAPI,
  addArticleCommentAPI
} from '@/api'
import { timeAgo } from '@/utils/date.js'

export default {
  name: 'commentList',
  data() {
    return {
      commentList: [], // 储存文章评论或回复的评论
      offset: '', // 做分页
      lastId: null, // 请求更多评论
      timeAgo, // 注册处理时间的方法
      isShowComtInp: true, // 是否显示评论输入框
      commentText: '', // 评论输入框的值
      total: 0, // 总评论数
      loading: false, // 是否为加载状态
      finished: false // 是否不再触发onLoad事件
    }
  },
  mounted() {
    // 获取文章评论
    this.getArticleComment()
  },
  methods: {
    // 获取文章评论
    async getArticleComment() {
      const { data: res } = await getArticleCommentAPI({
        id: this.$route.query.articelId
      })
      this.commentList = res.data.results
      this.total = res.data.total_count
      this.lastId = res.data.last_id
      // 如果谋篇文章没有评论，则不触发onload事件
      if (res.data.results.length === 0) {
        this.finished = true
      }
    },
    // 给评论点赞或取消点赞
    async likeOrDislike(obj, comId) {
      if (obj.is_liking) {
        // 如果对评论点赞了，则发起不点赞请求
        await dislikeArticleCommentAPI(comId)
        obj.is_liking = false
      } else {
        // 如果没对评论点赞，则发起点赞请求
        await likeArticleCommentAPI(comId)
        obj.is_liking = true
      }
    },
    // 点击准备评论按钮或input框
    prepareComment() {
      this.isShowComtInp = !this.isShowComtInp
    },
    // 失去输入框焦点
    blurInp() {
      if (this.commentText) return
      this.isShowComtInp = !this.isShowComtInp
    },
    // 点击发布评论
    async sendComment() {
      if (this.commentText) {
        await addArticleCommentAPI({
          target: this.$route.query.articelId,
          content: this.commentText
        })
        // 刷新文章评论
        this.getArticleComment()
        // 清空输入框的值 和 收起输入框
        this.commentText = ''
        this.isShowComtInp = true
        // 滚动到第一条评论
        this.commentClickFn()
      }
    },
    // 滚动到第一条评论
    commentClickFn() {
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 加载更多评论
    async onLoad() {
      // 如果把评论都请求回来了，就不再触发onLoad事件
      if (
        this.commentList.length === this.total &&
        this.commentList.length > 0
      ) {
        this.loading = false
        // 如果请求回的数据为空，不再触发onLoad事件
        this.finished = true
        return
      }
      if (this.commentList.length > 0) {
        const { data: res } = await getArticleCommentAPI({
          id: this.$route.query.articelId,
          offset: this.lastId
        })
        this.commentList = [...this.commentList, ...res.data.results]
        this.total = res.data.total_count
        this.lastId = res.data.last_id
        this.loading = false
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}
// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
