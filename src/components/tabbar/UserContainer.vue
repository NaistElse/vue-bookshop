<template>
  <div class="userinfo">

    <div class="mui-content" v-if="islogin">
			<div class="title">
				<div class="avatar">

        </div>
			</div>
      <p>你好。。。</p>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						新消息通知
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						隐私
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						通用
					</a>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 25px;">
				<li class="mui-table-view-cell">
					<a id="about" class="mui-navigate-right">
						关于网上书店
					</a>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 25px;">
				<li class="mui-table-view-cell">
					<a style="text-align: center;color: #FF3B30;" @click="loginOut">
						退出登录
					</a>
				</li>
			</ul>
		</div>

    <div class="buttondiv" v-else>
      <router-link type="button" class="mui-btn mui-btn-primary mui-btn-block" :to="'/login'" tag="button">立即登录</router-link>
      <router-link type="button" class="mui-btn mui-btn-danger mui-btn-block" :to="'/register'" tag="button">立即注册</router-link>
    </div>

  </div>

</template>

<script>

export default {
  data () {
    return {
      islogin: false
    }
  },
  created () {
    this.isloginfn ()

  },
  methods: {
    isloginfn () {
      if (JSON.stringify(this.$store.state.user) !== '{}') {
        this.islogin = true
      }
    },
    loginOut () {
      this.$store.state.user = '{}'
      this.$store.state.car = '[]'
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('car')
      this.$router.go(0)
    }

  }
}

</script>

<style lang="scss" scoped>
.userinfo{


  .buttondiv{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-content: center;



    button{
      width: 48%;
    }
  }

  .mui-content{

  padding-top: 20px;

    .title{
      display: flex;
      justify-content: center;
      flex-direction: row;
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50px;
        border: 1px solid #ccc;
      }
    }
    p{
      text-align: center;
      margin-top: 20px;
      margin-top: 20px;
    }
  }
}

</style>
