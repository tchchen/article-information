<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ articlesInfo.title }}</span>
          <!-- 单图 -->
          <img
            v-if="articlesInfo.cover.type == 1"
            class="thumb"
            :src="articlesInfo.cover.images[0]"
            alt="" />
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="articlesInfo.cover.type > 1">
          <img
            v-for="(imgUrl, index) in articlesInfo.cover.images"
            :key="index"
            class="thumb"
            :src="imgUrl"
            alt="" />
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
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date.js'

export default {
  name: 'ArticleItem',
  props: {
    articlesInfo: {
      type: Object,
      defaultL: () => {}
    }
  },
  data() {
    return {
      timeAgo // 注册处理时间的方法，因为不注册无法在模板中使用
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
  img {
    margin: 0 3px;
  }
}
</style>
