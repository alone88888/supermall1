<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav'></detail-nav-bar>
    <scroll class='content'
            ref='scroll'>

      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :imagesInfo='detailInfo'
                         @imgLoad='imgLoad'></detail-goods-info>

      <detail-param-info :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info :commentInfo='commentInfo'></detail-comment-info>
    </scroll>

  </div>
</template>

<script>



import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'


import Scroll from 'components/common/scroll/Scroll'


import { getDetail, Goods, Shop, GoodsParams } from 'network/detail'
export default {
  name: 'Detail'

  ,
  components: {
    DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo
    , DetailCommentInfo

  },
  data () {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  }
  , created () {
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情数据
      this.detailInfo = data.detailInfo

      //获取参数额信息
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

      //获取评论嘻嘻  
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })


  },
  activated () {

  }, methods: {
    imgLoad () {
      this.$refs.scroll.refresh()
    }
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>