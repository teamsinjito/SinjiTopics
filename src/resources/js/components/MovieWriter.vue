<template>
    <div class="w-100 h-100 writer-container pl-5 pr-5">
        <div class="writer">
            <span id="ityped" class="txt_M movie"></span>
        </div>
    </div>
</template>

<script>
import Typed from 'typed.js';
export default {
    props:{
        text:{
            type:String
        },
        paused:{
            type:Boolean
        }

    },
    data(){
        return{
            writer:"",
            option:""
        }
    },
    watch:{
        paused:function(val){

            if(val == true){
                this.writer.stop()

            }else{
                this.writer.start()
            }

        }           
    },
    mounted:function(){
        if(this.writer == ""){
            const word =this.text.split('。')
            var vWord=[]
            word.forEach(element => {
                if(element !=   ""){
                    vWord.push(element + "。")
                }
            });
        
            this.writer = new Typed(document.querySelector("#ityped"),{
                strings :vWord,
                loop:true,
                typeSpeed:75,
                backSpeed: 25,
            })
        }
        if(this.paused){
            this.writer.stop()
        }
    }
}
</script>

<style scoped>
.writer-container{
    display: flex;
    justify-content: center;
    align-items: center;

}
#ityped{
    color: floralwhite;
}

.ityped-cursor {
    font-size: 1em;
    opacity: 1;
    -webkit-animation: blink 0.3s infinite;
    -moz-animation: blink 0.3s infinite;
    animation: blink 0.3s infinite;
    animation-direction: alternate;
}

@keyframes blink {
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes blink {
    100% {
        opacity: 0;
    }
}

@-moz-keyframes blink {
    100% {
        opacity: 0;
    }
}


</style>