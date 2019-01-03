<template>
  <div class="shopcar-container">

    <div class="goods-list">

      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in carlist" :key="item.book_id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

            <mt-switch
                v-model="$store.getters.getBookSelect[item.book_id]"
                @change="selectedChanged(item.book_id, $store.getters.getBookSelect[item.book_id])">
            </mt-switch>
            <img src="" alt="...">
            <div class="info">
              <h1>{{ item.book_id }}</h1>
              <p>
                <span class="price">￥{{ item.price }}</span>

                <numbox :initcount="$store.getters.getBookCount[item.book_id]" :bookid="item.book_id"></numbox>

                <a href="#" @click.prevent="remove(item.book_id, i)">删除</a>
              </p>
            </div>

					</div>
				</div>
			</div>

    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{ $store.getters.getBookCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getBookCountAndAmount.amount }}</span></p>
            </div>
             <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>




  </div>

</template>

<script>

import numbox from "../subcomponents/numbox.vue"

export default {
  data () {
    return {
      carlist: this.$store.state.car
    }
  },
  created () {

  },
  methods: {
    remove(id, index) {
      this.carlist.splice(index, 1)
      this.$store.commit("removeCar", id)
    },
    selectedChanged (id, val) {
      this.$store.commit("updateBookSelected", { book_id: id, select: val })
    }


  },
  components: {
    numbox
  }
}

</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
