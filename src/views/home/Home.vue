<template>
  <div id='home'>
    <nav-bar class='home-nav'>
      <div slot='center'> 购物街</div>
    </nav-bar>

    <tab-control class='tab-control'
                 :titles='["流行","新款","精选"]'
                 @tabClick='tabClick'
                 ref='tabControl1'
                 v-show="isTabFixed" />

    <scroll class='content'
            ref='scroll'
            :probe-type="3"
            :pull-up-load='true'
            @scroll="contentScroll"
            @scrollEnd='scrollEnd'>

      <home-swiper @swiperImageLoad="swiperImageLoad"
                   :banners="banners" />
      <recommend-view :recommends='recommends' />
      <feature-vue />
      <tab-control class='tab-control'
                   :titles='["流行","新款","精选"]'
                   @tabClick='tabClick'
                   ref='tabControl2' />
      <goods-list :goods="goods[currentType].list" />

    </scroll>
    <back-top @click.native='backClick'
              v-show='isShowBackTop' />

  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureVue from './childComps/FeatureVue.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import {
  getHomeMultidata,
  getHomeGoods
} from 'network/home'



export default {
  name: 'Home',
  components: {
    NavBar, HomeSwiper, RecommendView,
    FeatureVue, TabControl, GoodsList, Scroll, BackTop


  },


  data () {

    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created () {
    //1. 请求多个数据

    this.getHomeMultidata()
    //2.请求商品数据

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


    //3. 监听图片加载

  },
  mounted () {

    const refresh = this.debounce(this.$refs.scroll.refresh, 500)


    this.$bus.$on('itemImageLoad', () => {

      refresh()
      //  this.$refs.scroll.refresh()
    })

    //.获取tabcontrol de offsettop
    // 或有的组件都有一个属性叫 $el 用于获取组件中的元素的

  },
  methods: {
    scrollEnd () {
      this.getHomeGoods(this.currentType)
    },
    debounce (func, delay) {
      let timer = null

      return function (...args) {
        if (timer) clearTimeout(timer)


        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
    , swiperImageLoad () {

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
    ,
    /*事件监听相关的方法 */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },


    /* 网络请求相关代码 */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }

    , getHomeGoods (type) {

      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.scroll.finishPullUp()
      })
    }
    , backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll (position) {
      //1.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000 ? true : false
      //2.决定tabcontrol是否吸顶  position：fixed
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    }

  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {

    this.saveY = this.$refs.scroll.getScrollY().absStartY
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 43px;
  background-color: #fff;
  z-index: 9;
}
.content {
  /* height: 475px; */
  overflow: hidden;
  /* margin-top: 44px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .fixed{
  position: fixed;
  right: 0;
  left: 0;
  top: 44px;
} */
</style>
