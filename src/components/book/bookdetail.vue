<template>
  <div class="goodsinfo-container">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>


    <!-- 商品购买区域 -->
    <div class="mui-card">
      <img style="width:200px;height:300px;margin-left: 80px;" :src="'/BookCovers/' + bookdetail.ISBN + '.jpg'" alt="....">
      <div class="mui-card-header">{{ bookdetail.Title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            销售价：<span class="now_price">￥{{ bookdetail.UnitPrice }}</span>
          </p>
          <p>购买数量：
            <div class="mui-numbox" data-numbox-min='1'>
              <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
              <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" />
              <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">图书参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>作者：{{ bookdetail.Author }}</p>
          <p>出版社：{{ bookdetail.publishername }}</p>
          <p>出版日期：{{ bookdetail.PublishDate | dateFormat }}</p>
          <p>ISBN：{{ bookdetail.ISBN }}</p>
        </div>
      </div>
    </div>

    <mt-tab-container value="1" swipeable="true">
      <mt-tab-container-item id="1">
        <div class="mui-card">
          <div class="mui-card-header">内容简介</div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <div v-html="bookdetail.ContentDescription"></div>
              <p>本书特色</p>
              <hr>
              <div v-html="bookdetail.EditorComment"></div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="mui-card">
          <div class="mui-card-header">章节目录</div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <div v-html="bookdetail.TOC"></div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>

</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"

import { TabContainer, TabContainerItem } from 'mint-ui'

export default {
  data () {
    return {
      id: this.$route.params.id,
      bookdetail: {},
      ballFlag: false,
      selectedCount: 1
    }
  },
  mounted () {
    mui('.mui-numbox').numbox()
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$http.get('api/bookdetail?id='+ this.id)
      .then( result => {
        if (result.body.status === 0) {
          this.bookdetail = result.body.message[0]
        }
      })
    },
    addToShopCar () {

      if (JSON.stringify(this.$store.state.user) === '{}') {
        return this.$router.push({ path: "/login" })
      }

      this.ballFlag = !this.ballFlag

      this.selectedCount = parseInt(this.$refs.numbox.value)

      var bookdetail = {
        book_id: parseInt(this.id),
        count: this.selectedCount,
        price: parseInt(this.bookdetail.UnitPrice),
        select: true
      }

      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addCar", bookdetail)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)"
    },
    enter(el, done) {
      el.offsetWidth

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    }

  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 490px;
    left: 146px;
  }
}
</style>
