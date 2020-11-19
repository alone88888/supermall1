<template>
  <!-- ref/children -->
  <div class='wrapper'
       ref='wrapper'>

    <div class='content'>
      <slot></slot>

    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll'
  ,
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  }
  ,
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time = 300)
    }
    , refresh () {
      this.scroll && this.scroll.scrollTo && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })

    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })


    this.scroll.on('pullingUp', () => {
      //    this.scroll.scrollTo(0,0)

      this.$emit('scrollEnd')

    })


  },

}
</script>

<style scoped>
</style>