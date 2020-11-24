<template>

  <div class='cart-list'>
    <ul>
      <scroll class='content'
              ref='scroll'>
        <cart-list-item :product='cartList' />
      </scroll>
    </ul>
  </div>

</template>

<script>

import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'


import { mapGetters } from 'vuex'


export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll, CartListItem
  },
  activated () {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>