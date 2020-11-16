<template>
<div class='wrapper'>
   <ul class='content'>
     <button @click='btnClick'>按钮</button>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
     <li>内容</li>
   </ul>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name:'Category',
data() {
  return {
    
  }
},
mounted() {
 const bscroll= new BScroll(document.querySelector('.wrapper'),{
   probeType:3,
   pullUpLoad:true,
   click:false  
   })
  bscroll.on('scroll',(position)=>{
    // console.log(position);
  })
  bscroll.on('pullingUp',()=>{
    console.log('上拉加载更多');
    bscroll.finishPullUp()
  })
},
methods: {
  btnClick(){
    console.log(1);
  }
},
}
</script>

<style scoped>
.wrapper{
  height: 200px;
  background-color: red;
  overflow: hidden;
}
</style>