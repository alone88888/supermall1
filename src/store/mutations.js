import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'


export default {
  //mutations 唯一的目的就是修改state中状态
  // mutations 设计原则      中的每个方法尽可能完成的事件比较单一一点s
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}