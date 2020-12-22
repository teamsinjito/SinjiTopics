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
            console.log(ln)
            if(ln>=2000){
                ani ="EndRoll1 90s infinite"
            }else if(ln>=1800){
                ani ="EndRoll2 80s infinite"
            }else if(ln>=1400){  
                ani ="EndRoll3 80s infinite"
            }else if(ln>=1200){
                ani="EndRoll4 70s infinite"
            }else if(ln>=1000){
                ani="EndRoll5 60s infinite"
            }else if(ln>=800){
                ani="EndRoll6 60s infinite"
            }else if(ln>=600){
                ani="EndRoll7 50s infinite"
            }else if(ln>=400){
                ani="EndRoll8 50s infinite"
            }else if(ln>=200){
                ani="EndRoll9 40s infinite"
            }else if(ln>=100){
                ani="EndRoll10 40s infinite"
            }else{
                ani="EndRoll11 30s infinite"
            }
            return{
                animation: ani,
                animationTimingFunction: "linear"
            }
        }
    }
}
</script>