<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name === 'ch'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ obj.message }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ obj.message }}</div>
          <van-image fit="cover" round :src="imgUrl" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="info">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入 socket.io-client 包
import { io } from 'socket.io-client'
import { getToken } from '@/utils/token.js'

export default {
  name: 'Chat',
  data() {
    return {
      info: '',
      list: [
        { name: 'ch', message: '早上好' },
        { name: 'me', message: '早上好！！！' },
        { name: 'ch', message: '早上好' },
        { name: 'me', message: '早上好！！！' },
        { name: 'ch', message: '早上好' },
        { name: 'me', message: '早上好！！！' },
        { name: 'ch', message: '早上好' },
        { name: 'me', message: '早上好！！！' }
      ],
      socket: null,
      imgUrl: ''
    }
  },
  mounted() {
    // 获取用户头像
    this.imgUrl = sessionStorage.getItem('userimg')
    // io是建立socket链接，和axios没关系
    this.socket = io('ws://geek.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })

    // 测试是否建立链接成功
    this.socket.on('connect', () => {
      console.log('socket连接成功')
    })

    // 接収后端传来的信息
    this.socket.on('message', (obj) => {
      // 更新聊天信息
      this.list.push({
        name: 'ch',
        message: obj.msg
      })
      // 滚动到底部,不让最后一条信息被遮住
      this.scrollBom()
    })
  },
  destroyed() {
    // 组件销毁，关闭连接，销毁websocket对象
    this.socket.close()
    this.socket = null
  },
  methods: {
    // 发送信息
    sendFn() {
      if (this.info.length === 0) return
      this.socket.emit('message', {
        msg: this.info,
        timestamp: new Date().getTime()
      })
      // 更新聊天信息
      this.list.push({
        name: 'me',
        message: this.info
      })
      // 滚动到底部,不让最后一条信息被遮住
      this.scrollBom()
      this.info = ''
    },
    // 滚动到底部,不让最后一条信息被遮住
    scrollBom() {
      // 获取最后的那条信息的 dom元素
      this.$nextTick(() => {
        const lastDiv = document.querySelector('.chat-list>div:last-child')
        lastDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
