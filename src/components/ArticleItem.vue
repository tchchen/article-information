<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell @click="viewArticle">
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ articlesInfo.title }}</span>
          <!-- 单图 -->
          <!-- <img
            v-if="articlesInfo.cover.type == 1"
            class="thumb"
            :src="articlesInfo.cover.images[0]"
            alt="" /> -->
          <van-image
            class="thumb"
            v-if="articlesInfo.cover.type == 1"
            :src="articlesInfo.cover.images[0]">
            <template v-slot:error>找不到图片</template>
          </van-image>
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="articlesInfo.cover.type > 1">
          <!-- <img
            v-for="(imgUrl, index) in articlesInfo.cover.images"
            :key="index"
            class="thumb"
            :src="imgUrl"
            alt="" /> -->
          <van-image
            class="thumb"
            v-for="(imgUrl, index) in articlesInfo.cover.images"
            :key="index"
            :src="imgUrl">
            <template v-slot:error>找不到图片</template>
          </van-image>
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ articlesInfo.aut_name }}</span>
            <span>{{ articlesInfo.comm_count }}评论</span>
            <span>{{ timeAgo(articlesInfo.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon
            name="cross"
            @click="showActiceSheet"
            v-if="isShowFeedBackBtn" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="bottomText"
      @select="onSelect"
      @close="closeSheet"
      @cancel="cancelOrReturn" />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date.js' // 评论处理时间的方法
import { firstActions, secondActions } from '@/api/reports' // 反馈的选项

export default {
  name: 'ArticleItem',
  props: {
    articlesInfo: {
      type: Object,
      defaultL: () => {}
    },
    isShowFeedBackBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timeAgo, // 注册处理时间的方法，因为不注册无法在模板中使用
      show: false, // 是否显示动作面板
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    // 反馈按钮
    showActiceSheet() {
      this.show = true
    },
    // 选中选项时触发
    onSelect(actions) {
      if (actions.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (actions.name === '不感兴趣') {
        // 发起对不感兴趣的请求
        this.$emit('dislikesArcticleFn', this.articlesInfo.art_id)
        this.show = false
      } else {
        this.$emit('reportArecleFn', this.articlesInfo.art_id, actions.value)
        this.show = false
      }
    },
    // 关闭面板时触发
    closeSheet() {
      this.actions = firstActions
      this.bottomText = '取消'
    },
    // 判断点击的是取消按钮还是返回按钮
    cancelOrReturn() {
      if (this.bottomText === '返回') {
        this.actions = firstActions
        this.bottomText = '取消'
        return (this.show = true)
      }
      this.show = false
    },
    // 点击单元格，查看文章详情
    viewArticle() {
      this.$router.push(`/articel_detail?articelId=${this.articlesInfo.art_id}`)
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
// 单图的图片
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
// 多图
.thumb-box {
  display: flex;
  justify-content: space-evenly;
}
</style>
