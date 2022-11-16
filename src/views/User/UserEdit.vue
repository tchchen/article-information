<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="userInfoObj.photo"
            @click="editPhoto" />
          <input type="file" v-show="false" ref="fileRef" @input="changeFile" />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        :value="userInfoObj.name"
        is-link
        @click="editName" />
      <van-cell
        title="生日"
        :value="userInfoObj.birthday"
        is-link
        @click="selBirthday" />
    </van-cell-group>
    <!-- 修改姓名的弹出层 -->
    <van-dialog
      v-model="isShowDialog"
      title="修改名称"
      message-align="center"
      show-cancel-button
      :before-close="beforeClose">
      <input type="text" v-focus v-model="inputValName" />
    </van-dialog>
    <!-- 修改生日的时间选择器 -->
    <van-popup
      v-model="isShowDateSel"
      overlay
      position="bottom"
      round
      @close="closePopup">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmFn"
        @cancel="cancelFn" />
    </van-popup>
  </div>
</template>

<script>
import API from '@/api'
import { Notify } from 'vant'

export default {
  name: 'UserEdit',
  mounted() {
    this.getUserInfoObj()
  },
  data() {
    return {
      userInfoObj: {}, // 个人简介
      isShowDialog: false,
      inputValName: '',
      isShowDateSel: false,
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2025, 10, 1)
    }
  },
  methods: {
    // 获取用户个人简介
    async getUserInfoObj() {
      const { data: res } = await API.user.getUserInfoAPI()
      this.userInfoObj = res.data
    },
    // 修改头像
    editPhoto() {
      this.$refs.fileRef.click()
    },
    // 选择文件
    async changeFile(e) {
      // 若确定则发起更改头像请求
      if (e.target.length === 0) return
      const fdObj = new FormData()
      fdObj.append('photo', e.target.files[0])
      const { data: res } = await API.user.updateUserPhotoAPI(fdObj)
      this.userInfoObj.photo = res.data.photo
      // 储存头像，会话储存防止，刷新vuex清空没照片
      sessionStorage.setItem('userimg', res.data.photo)
      this.$store.commit('SET_USERPHOTO', res.data.photo)
    },
    // 修改用户名
    editName() {
      this.inputValName = this.userInfoObj.name
      this.isShowDialog = true
    },
    // 对话框关闭前
    beforeClose(action, done) {
      // 如果点击确定
      if (action === 'confirm') {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputValName)) {
          // 如果通过校验且修改了用户名
          if (this.userInfoObj.name === this.inputValName) {
            done(false)
            Notify({ type: 'warning', message: '请求修改用户名' })
            return
          }
          // 修改用户名
          API.user.updateInfoAPI({ name: this.inputValName })
          this.userInfoObj.name = this.inputValName
          done()
        } else {
          Notify({ type: 'warning', message: '用户名只能是1-7位中英文' })
          done(false)
        }
      } else {
        // 点击取消
        done()
      }
    },
    // 点击修改生日
    selBirthday() {
      this.currentDate = new Date(this.userInfoObj.birthday)
      this.isShowDateSel = true
    },
    // 弹出层关闭的回调
    closePopup() {
      this.isShowDateSel = false
    },
    // 时间选择器的确定按钮
    async confirmFn(val) {
      const biry =
        new Date(val).getFullYear() +
        '-' +
        parseInt(new Date(val).getMonth() + 1) +
        '-' +
        new Date(val).getDate()
      // 修改生日
      await API.user.updateInfoAPI({ birthday: biry })
      this.userInfoObj.birthday = biry
      this.isShowDateSel = false
    },
    cancelFn() {
      this.isShowDateSel = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/ .van-dialog__content {
  text-align: center;
  & input {
    border: none;
    text-align: center;
  }
}
</style>
