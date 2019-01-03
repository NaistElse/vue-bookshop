<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 小标题区域 -->
    <img style="width:100%;height:188px;" src="http://m.360buyimg.com/babel/jfs/t1/9638/20/4308/107810/5bdaa068E8ab717d0/2c2b6a7b6e298c12.jpg!q70.dpg" alt="">

    <!-- TOP 10 图书区域 -->
    <h3>TOP10图书</h3>

    <div class="goods-list">
      <div class="goods-item" v-for="item in top10" :key="item.Id" @click="getdetail(item.Id)">
        <img :src="'/BookCovers/' + item.ISBN + '.jpg'" alt="...">
        <h1 class="title">{{ item.Title }}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{ item.UnitPrice }}</span>
            <span class="old">￥12</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
          </p>
        </div>
      </div>
    </div>


    <!-- 推荐图书 -->
    <h3>图书推荐</h3>

    <div class="mui-card" v-for="item in recobook" :key="item.Id" @click="getdetail(item.Id)">
				<div class="mui-card-header mui-card-media" style="height:40vw;"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{ item.Author}}</p>
						<p style="color: #333;">{{ item.Title }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">❤</a>
					<a class="mui-card-link">图书详情</a>
				</div>
			</div>

      <mt-button type="danger" size="large" @click="getrecomore">加载更多</mt-button>

  </div>

</template>

<script>
import { Toast } from "mint-ui"
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      lunbotuList: [],
      top10: [],
      recobook: [],
      page: 1
    }
  },
  created () {
    this.getlunbotu(),
    this.gettop10(),
    this.getrecobook ()
  },
  methods: {
    getlunbotu () {
      this.$http.get("api/lunbotu")
      .then( result => {
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message
        } else {
          Toast("网路繁忙。。。")
        }
      })
    },
    gettop10 () {
      this.$http.get("api/top10")
      .then( result => {
        if (result.body.status === 0) {
          this.top10 = result.body.message
        } else {
          Toast("网路繁忙。。。")
        }
      })
    },
    getrecobook () {
      this.$http.get("api/recobook?page=" + this.page)
      .then( result => {
        if (result.body.status === 0) {
          this.recobook = this.recobook.concat(result.body.message)
          Indicator.close()
        } else {
          Toast("网路繁忙。。。")
        }
      })
    },
    getdetail (id) {
      this.$router.push({ name: "bookdetail", params: { id } })
    },
    getrecomore () {
      Indicator.open('正在拼命加载中...')
      this.page++
      this.getrecobook ()
    }
  }
}

</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 150px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: cyan;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

h3{
  text-align: center;
  color:#e09830;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

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



</style>
