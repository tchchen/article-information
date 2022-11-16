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
        color="#0763db"
        sticky
        offset-top="1.2rem"
        @change="changeChannel">
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
      channelId: 0, // 用户选择的频道id,tabs选择时会变化
      isShowPopup: false, // 是否显示添加频道的弹出层
      allChannelList: [], // 用户为选择的频道
      channelScrollTopObj: {} // 储存当前频道的 id 和 滚动条滚动的距离
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
    // 切换频道时触发
    changeChannel() {
      // 因为这个组件在频道切换走时，会把被切换的那个容器的height设置为0，
      // 再切换触发这个方法 dom 还没更新，高度还为0，所以要延迟赋值
      this.$nextTick(() => {
        document.documentElement.scrollTop =
          this.channelScrollTopObj[this.channelId]
      })
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
      await updateChannelAPI({ channels: theNewArr })
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
    },
    // 收集滚动条滚动高度
    scrollFn() {
      this.$route.meta.scrollTop = document.documentElement.scrollTop
      // 动态添加一个键值对，频道id : 当前频道滚动条距离顶部的距离
      this.channelScrollTopObj[this.channelId] =
        document.documentElement.scrollTop
    }
  },
  // 被缓存的组件，被 切换走时 触发
  deactivated() {
    // 移除window 下的 scroll事件
    window.removeEventListener('scroll', this.scrollFn)
  },
  // 被缓存的组件，在创建时触发一次，被 切换回来时 又触发一次
  activated() {
    // 给window添加一个滚动事件
    window.addEventListener('scroll', this.scrollFn)
    // 立刻设置滚动条的位置
    document.documentElement.scrollTop = this.$route.meta.scrollTop
    // 每滚动一下就存给 home路由元信息 的 scrollTop
    // 当切换时 路由时 的那个页面 全部内容高度 超过 设备高度 就会出现滚动条
    // 这时依然会触发 window 的 scroll 事件，因为这个 scroll事件 是绑定在window下的
    // 如果 全部内容高度 没超过 设备高度 就不会出现滚动条，也就不会触发 window 下的 scroll事件了
  },
  computed: {
    // 计算用户为选择的频道
    notSelectedChannelList() {
      // 所有频道
      const newArr = this.allChannelList.filter((bigObj) => {
        // 找到被选择的频道
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
  padding-top: 46px;
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
