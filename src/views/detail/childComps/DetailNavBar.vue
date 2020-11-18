<template>
  <div>
    <nav-bar>
      <div slot='left'
           @click='backClick'
           class='back'>
        <img src="~assets/images/common/back.svg"
             alt="">
      </div>
      <div slot='center'
           class='title'>
        <div v-for="(item,index) in titles"
             @click='currentIndex=index'
             class='title-item'
             :class='{active:index==currentIndex}'
             :key='index'>
          {{item}}
        </div>
      </div>

    </nav-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backClick () {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>