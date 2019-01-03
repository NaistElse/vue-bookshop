<template>

  <div>
    <header class="mui-bar mui-bar-nav">
			<!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
			<h1 class="mui-title">注册</h1>
		</header>
		<div class="mui-content">

				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' name="username" type="text" class="mui-input-clear mui-input" v-model="username" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' name="password" type="password" class="mui-input-clear mui-input" v-model="password" placeholder="请输入密码">
				</div>
				<div class="mui-input-row">
					<label>确认密码</label>
					<input id='password_confirm' name="passwordagain" type="password" class="mui-input-clear mui-input" v-model="passwordagain" placeholder="请确认密码">
				</div>

			<div class="mui-content-padded">
				<button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="register">注册</button>
			</div>
		</div>


  </div>




</template>

<script>

import { Toast } from 'mint-ui'


export default {
  data () {
    return {
      username: '',
      password: '',
      passwordagain: ''
    }
  },
  methods: {
    register () {
      this.$http.post(`api/register`,
         { username: this.username, password: this.password, passwordagain: this.passwordagain })
      .then( data => {
        if (data.body.status === 1) {
          Toast({
            message: data.body.message,
            position: 'middle',
            duration: 1000
          })
        } else if (data.body.status === 2) {
          Toast({
            message: data.body.message,
            position: 'middle',
            duration: 1000
          })
        } else if (data.body.status === 0) {
          Toast({
            message: data.body.message,
            position: 'middle',
            duration: 1000
          })
          this.$router.push({ path: "/login" })
        }
      })
    }

  }

}

</script>

<style lang="scss" scoped>
header{
  top: 40px;
}
.mui-content{
  margin-top: 10px;
}
</style>
