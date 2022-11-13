<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-model.trim="kw"
        v-focus
        @input="searchKw"
        @search="clickSearch" />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="lightFn(str, kw)"
        @click="ckSearchKeyword(str)"></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          @click="ckHistoryKetword(item)"
          v-for="(item, index) in history"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api'

export default {
  name: 'Search',
  data() {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖的定时器
      suggestList: [], // 搜索结果数据
      history: JSON.parse(localStorage.getItem('searchHistory')) || [] // 搜索历史,有就要没有就位空数组
    }
  },
  methods: {
    // 输入框内容变化时触发
    searchKw() {
      if (this.kw.length === 0) {
        return (this.suggestList = [])
      }
      // 自己写防抖，因为要获取搜索建议
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const { data: res } = await suggestListAPI({ keywords: this.kw })
        this.suggestList = res.data.options
      }, 300)
    },
    // 专门处理字符串高亮关键字
    lightFn(str, target) {
      const reg = new RegExp(target, 'ig')

      return str.replace(reg, (match) => {
        // match是关键字匹配的值(尽量保持原样)
        return `<span style="color: orange">${match}</span>`
      })
    },
    // 跳转到搜索结果页
    jumpRouter(keyword) {
      // 因为路由跳转在watch执行前，防止路由跳转没有监听到history的变化
      const that = this
      setTimeout(function () {
        that.$router.push(`/search_rsulte?keywords=${keyword}`)
      })
    },
    // 点击搜索建议
    ckSearchKeyword(keyword) {
      // 给搜索历史的数组追加搜索的历史记录
      this.history.push(keyword)
      console.log(keyword)
      // 跳转到搜索结果页
      this.jumpRouter(keyword)
    },
    // 点击搜索历史
    ckHistoryKetword(keyword) {
      // 跳转到搜索结果页
      this.jumpRouter(keyword)
    },
    // 点击搜索图标
    clickSearch() {
      if (this.kw.length !== 0) {
        // 给搜索历史的数组追加搜索的历史记录
        this.history.push(this.kw)
        // 跳转到搜索结果页
        this.jumpRouter(this.kw)
      }
    }
  },
  watch: {
    // 搜索历史记录改变时，向本地存储历史搜索记录
    history: {
      deep: true,
      handler() {
        // 数组去重
        const newArr = [...new Set(this.history)]
        localStorage.setItem('searchHistory', JSON.stringify(newArr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
