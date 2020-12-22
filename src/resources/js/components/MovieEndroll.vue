<template>

    <p class="txt_M w-100 pl-3 pr-3 movie end-roll" v-bind:style="endRollSpeed">{{text}}</p>

</template>

<script>
export default {
    props:{
        text:{
            type:String
        }

    },
    computed:{
        endRollSpeed(){
            var ln = this.text.length
            var ani = "EndRoll 60s infinite"

            // if(ln>=1200){
            //     ani ="EndRoll1 60s infinite"
            // }else if(ln>=750){
            //     ani ="EndRoll2 45s infinite"
            // }else if(ln>=300){  
            //     ani ="EndRoll3 30s infinite"
            // }else if(ln>=200){
            //     ani="EndRoll4 25s infinite"
            // }else{
            //     ani="EndRoll5 15s infinite"
            // }
            return{
                animation: ani,
                animationTimingFunction: "linear"
            }
        }
    }
}
</script>