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
            var ani = ""
            var sec = Math.floor(ln / 10)   
            ani = "EndRoll " + String(sec) + "s infinite"
            // if(ln>=2000){
            //     ani ="EndRoll 120s infinite"
            // }else if(ln>=1800){
            //     ani ="EndRoll 100s infinite"
            // }else if(ln>=1400){  
            //     ani ="EndRoll 100s infinite"
            // }else if(ln>=1200){
            //     ani="EndRoll 90s infinite"
            // }else if(ln>=1000){
            //     ani="EndRoll 80s infinite"
            // }else if(ln>=800){
            //     ani="EndRoll 80s infinite"
            // }else if(ln>=600){
            //     ani="EndRoll 70s infinite"
            // }else if(ln>=400){
            //     ani="EndRoll 70s infinite"
            // }else if(ln>=200){
            //     ani="EndRoll 60s infinite"
            // }else if(ln>=100){
            //     ani="EndRoll 60s infinite"
            // }else{
            //     ani="EndRoll 50s infinite"
            // }
            return{
                animation: ani,
                animationTimingFunction: "linear"
            }
        }
    }
}
</script>