<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar fixed>
      <template #left>
        <img class="img_left" src="@/assets/logo1.png" color="#fff" alt="" />
      </template>
      <template #right>
        <van-icon
          name="search"
          size="0.48rem"
          @click="$router.push('/search')" />
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
      </van-tabs>
      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="addChannle" />
    </div>
    <!-- 弹出层 -->
    <van-popup class="channel_popup" v-model="isShowPopup">
      <ChannelEdit
        :all-channel="notSelectedChannelList"
        :channel-list="channelList"
        @closePopupFn="closePopupEv"
        @addChannelEV="addChannelFn"
        @delChannelEV="delChannelFn"
        @intoChannelEV="intoChannelFn"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import {
  getUserChannelAPI,
  getAllChannelAPI,
  updateChannelAPI,
  removeChannelAPI
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'

export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      channelList: [], // 储存用户选择频道
      articlesList: [], // 储存文章数据
      pre_timestamp: null, // 储存上次文章数据请求回来的时间戳
      channelId: 0, // 频道id,tabs选择时会变化
      isShowPopup: false, // 是否显示添加频道的弹出层
      allChannelList: [] // 用户为选择的频道
    }
  },
  async mounted() {
    this.getUserSelectChannel() // 获取用户选择的频道
    // 获取所有频道
    const { data: res } = await getAllChannelAPI()
    this.allChannelList = res.data.channels
  },
  methods: {
    // 获取用户选择的频道
    async getUserSelectChannel() {
      const { data: res } = await getUserChannelAPI()
      this.channelList = res.data.channels
    },
    // 添加频道按钮
    addChannle() {
      this.isShowPopup = true
    },
    // 自定义事件，关闭弹出层
    closePopupEv() {
      this.isShowPopup = false
    },
    // 自定义事件，添加频道
    async addChannelFn(channels) {
      this.channelList.push(channels)
      // 不把推荐频道传给后台
      const newArr = this.channelList.filter((obj) => obj.id !== 0)
      // 不直接修改数组里的对象
      const theNewArr = newArr.map((obj, index) => {
        // 浅拷贝对象进行处理
        const newObj = { ...obj }
        delete newObj.name
        newObj.seq = index
        return newObj
      })
      const res = await updateChannelAPI({ channels: theNewArr })
      console.log(res)
    },
    // 自定义事件，删除频道
    delChannelFn(obj) {
      const index = this.channelList.findIndex((item) => item.id === obj.id)
      this.channelList.splice(index, 1)
      removeChannelAPI(obj.id) // 没有返回内容
    },
    // 自定义事件，进入被点击的频道
    intoChannelFn(channelId) {
      this.isShowPopup = false
      this.channelId = channelId
    }
  },
  computed: {
    // 计算用户为选择的频道
    notSelectedChannelList() {
      const newArr = this.allChannelList.filter((bigObj) => {
        const index = this.channelList.findIndex((smallObj) => {
          return smallObj.id === bigObj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .img_left {
  width: 3rem;
}
.main {
  padding-top: 44px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
