<template>
  <div>

    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.Id == 1 ? 'mui-active' : '']" v-for="item in category" :key="item.Id" @tap="getcategorybook(item.Id)">
            {{ item.Name }}
          </a>
        </div>
      </div>

    </div>

    <!-- 分类图书区域 -->
    <div class="load" style="height:660px;">
      <ul class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
          <router-link class="goods-item" v-for="item in categorybook" :key="item.Id" :to="'/home/bookdetail/' + item.Id" tag="li">
            <img :src="'/BookCovers/' + item.ISBN + '.jpg'" alt="...">
            <h1 class="title">{{ item.Title }}</h1>
            <div class="info">
              <p class="sell">
                <span>热卖中</span>
              </p>
            </div>
          </router-link>

      </ul>
      <p style="text-align:center;" v-if="flag">已经没有书啦。。。</p>
    </div>

  </div>

</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
import { InfiniteScroll } from 'mint-ui'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      category: [],
      categoryid: 1,
      categorybook: [],
      page: 0,
      loading: false,
      flag: false
    }
  },
  mounted () {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    })


  },
  created () {
    this.getcategory ()
    //this.getcategorybook (1)
  },
  methods: {
    getcategory () {
      this.$http.get(`api/category`)
      .then( result => {
        if (result.body.status === 0) {
          this.category = result.body.message
        }
      })
    },
    getcategorybook (id) {
      this.page = 1
      this.$http.get(`api/categorybook?categoryid=${id}&page=${this.page}`)
      .then( result => {
        if (result.body.status === 0) {
          this.categorybook = result.body.message
        }
      })
      this.categoryid = id
      this.loading = false
      this.flag = false
    },
    loadMore () {
      this.loading = true
      Indicator.open('加载中...')
      this.page ++
      this.$http.get(`api/categorybook?categoryid=${this.categoryid}&page=${this.page}`)
      .then( result => {
        if (result.body.status === 0) {
          if (result.body.message.length === 0) {
            this.loading = true
            this.flag = true
            Indicator.close()
          } else {
            this.categorybook = this.categorybook.concat(result.body.message)
            this.loading = false
            Indicator.close()
          }
        }
      })



    }
  }

}

</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

h3{
  text-align: center;
  color:#e09830;
}

#slider{
  position: fixed;
  background: #ccc;
  opacity: 0.75;
  top: 40px;
}

.load{


  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    padding-top: 30px;
    justify-content: space-between;
    position: relative;

    .goods-item {
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;
      img {
        width: 100%;
        height: 250px;
      }
      .title {
        width: 100%;
        height: 40px;
        padding-top: 20px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

      }

      .info {
        background-color: #eee;
        p {
          margin: 0;
          padding: 5px;
        }
        .price {
          .now {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .sell {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      }
    }
  }
}



</style>
