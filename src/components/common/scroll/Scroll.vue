<template>
<!-- ref/children -->
    <div class='wrapper' ref='wrapper'>

        <div class='content'>
        <slot></slot>

        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name:'Scroll'
,
props:{
    probeType:{
        type:Number,
        default:0
    }
}
,
methods: {
    scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time=300)
    }
},
data() {
        return {
            scroll:null
        }
    },
mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
       click:true,
       mouseWheel:true,
        probeType:this.probeType,
   pullUpLoad:true,
   })

    this.scroll.on('scroll',position=>{
        this.$emit('scroll',position)
    })


    this.scroll.on('pullingUp',()=>{
//    this.scroll.scrollTo(0,0)

this.$emit('scrollEnd')
    this.scroll.finishPullUp()
  })


},

}
</script>

<style scoped>

</style>