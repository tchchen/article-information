<template>
  <div class="login">
    <van-nav-bar title="文章资讯-登录" class="navBar" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginInfo.mobile"
        name="用户名"
        label="用户名"
        required
        placeholder="用户名"
        :rules="[
          {
            required: true,
            message: '请填写11位数的手机号',
            pattern: /^1[3456789]\d{9}$/
          }
        ]" />
      <van-field
        v-model="loginInfo.code"
        type="password"
        name="密码"
        label="密码"
        required
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '请填写6为数的密码',
            pattern: /^\d{6}$/
          }
        ]" />
      <span class="tip">若没账号可输入信息即可注册并登录</span>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          loading-text="登录中..."
          :loading="isLoading">
          登录
        </van-button>
      </div>
    </van-form>
    <p>
      <span>密码: 246810</span>
    </p>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'

export default {
  name: 'login',
  data() {
    return {
      // 用户登录信息
      loginInfo: {
        mobile: '13200281011',
        code: ''
      },
      // 登录按钮loading效果
      isLoading: false
    }
  },
  methods: {
    // 表单验证成功,才触发
    async onSubmit() {
      // 加载loading
      this.isLoading = true
      try {
        const { data: res } = await loginAPI(this.loginInfo)
        // 关闭loading
        this.isLoading = false
        Notify({ type: 'success', message: '登录成功' })
        // 本地存储token
        setToken(res.data.token)
        // 这个用于刷新token
        localStorage.setItem('refresh_token', res.data.refresh_token)
        // 跳转到首页
        this.$router.replace({
          path: this.$route.query.path || '/layout/home'
        })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
span.tip {
  display: inline-block;
  margin: 0 auto;
  text-align: right;
  width: 94vw;
  padding: 0 2.5px;
  font-size: 6px;
  color: rgb(201, 199, 199);
}
p {
  font-size: 12px;
  color: rgb(126, 126, 126);
  text-align: right;
  padding-right: 5vw;
}
</style>
