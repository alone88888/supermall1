<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav'
                    @titleClick='titleClick'
                    ref='nav'></detail-nav-bar>
    <scroll class='content'
            ref='scroll'
            @scroll='contentScroll1'
            :probeType='3'>

      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :imagesInfo='detailInfo'
                         @imgLoad='imgLoad'></detail-goods-info>

      <detail-param-info ref='params'
                         :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info ref='comment'
                           :commentInfo='commentInfo'></detail-comment-info>
      <goods-list ref='recommend'
                  :goods='recomments'></goods-list>
    </scroll>

    <detail-bottom-bar class='detail-bottom-bar'
                       @addCart='addToCart' />
    <back-top @click.native='backClick'
              v-show='isShowBackTop' />
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
import DetailBottomBar from './childComps/DetailBottomBar'


import { debounce } from 'common/utils'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from 'network/detail'

import { itemListenerMixin } from 'common/mixin'
import { backTopMixin } from 'common/mixin'
export default {
  name: 'Detail'

  ,
  components: {
    DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo
    , DetailCommentInfo, GoodsList, DetailBottomBar

  },
  mixins: [itemListenerMixin, backTopMixin]
  ,
  data () {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recomments: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0

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

      //获取评论信息 
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }


      //请求推荐数据
      getRecommend().then(res => {
        this.recomments = res.data.list
      })

      //1  第一获取  
      // 值不对的原因this.$refs.params.$el没有渲染出
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);

      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);

      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);


      this.$nextTick(() => {
        // 2. 第二次获取
        // 值不对  （图片没有计算在内）
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);

        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);

        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      })


    })

    this.getThemeTopY = debounce(() => {

      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);

      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);

      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)

    }, 100)

  },
  activated () {

  }, methods: {
    imgLoad () {
      this.$refs.scroll.refresh()
      this.getThemeTopY()

    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
    },
    contentScroll1 (position) {
      // 1.取Y值
      const positionY = -position.y
      // 2. positionY和主题中值进行对比
      //[0,7938,9120,9452]
      //positionY 在0-7938之间  index=0
      //positionY 在7938之间-9120  index=1
      //positionY 在9120-9452  index=2
      //positionY 在超过9452 index=3
      let length = this.themeTopYs.length


      for (let i = 0; i < length - 1; i++) {

        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }


        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {

        // this.currentIndex = i
        // console.log(this.currentIndex);
        // this.$refs.nav.currentIndex = this.currentIndex
        // }
      }

    }
    ,
    contentScroll (position) {
      //1.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000 ? true : false
      //2.决定tabcontrol是否吸顶  position：fixed
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    }
    , addToCart () {

      //1.获取在购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.iid = this.iid

      // 商品添加到购物车里面


    }
  },
  mounted () {



  },
  destroyed () {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  updated () {



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
  height: calc(100% - 44px - 2.09rem);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>