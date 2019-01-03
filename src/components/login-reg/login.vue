<template>
  <div>

    <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">

				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" v-model="loginid" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" v-model="password" placeholder="请输入密码">
				</div>


				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						自动登录
						<div id="autoLogin" class="mui-switch">
							<div class="mui-switch-handle"></div>
						</div>
					</li>
				</ul>

			<div class="mui-content-padded">
				<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login">登录</button>
				<div class="link-area"><a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>

  </div>

</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      loginid: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$http.post(`api/login`, { loginId: this.loginid, password: this.password })
      .then ( data => {
        if (data.body.status === 1) {
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
          //this.$store.state.user = data.body.user
          var user = data.body.user
          this.$store.commit("getUser", user)
          this.$router.push({ path: "/user" })
          this.getcar ()
        }
      })
    },
    getcar () {
      if (JSON.stringify(this.$store.state.user) !== '{}') {
        var user_id = this.$store.state.user.userid
        this.$http.post(`api/getcar`, { user_id })
        .then(data => {
          if (data.body.status === 0) {
            this.carlist = data.body.message
            this.$store.commit('getCarlist', data.body.message)
          }
        })
      }
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
