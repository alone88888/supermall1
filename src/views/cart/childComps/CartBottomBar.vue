<template>
  <div class='bottom-bar'>
    <div class='check-content'>
      <check-button class='check-button' />
      <span>全选</span>
    </div>

    <div class='price'>
      合计:{{totalPrice}}
    </div>

    <div class='calculate'>
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {

    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    }
  },
}
</script>

<style  scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 130px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-button {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.check-content {
  width: 80px;
  height: 20px;
  display: flex;
  align-items: center;
  position: relative;
  top: 10px;
  left: 10px;
}
.price {
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>