<template>
    <div class="container h-100 p-0 modal-contents">
        

        <v-touch v-on:swiperight="prePage" v-on:swipeleft="nextPage" class="cube w-100 h-100">
            
                <modal-details 
                    :surface="index" 
                    :topic="topic" 
                    v-for="(topic,index) in topics" 
                    :key="index"
                    :deg="deg"
                >
                </modal-details>
            

        </v-touch>

        <audio v-if="this.$store.state.autoPlay.music　&& this.$store.state.autoPlay.movie" id="audio" :src="`../storage/music/${this.topics[tpi].bgm_name}.mp3`" autoplay loop>
            あなたのブラウザーは <code>audio</code>要素をサポートしていません。
        </audio>
        <audio v-else id="audio" :src="`../storage/music/${this.topics[tpi].bgm_name}.mp3`" loop>
            あなたのブラウザーは <code>audio</code>要素をサポートしていません。
        </audio>

        <div class="pre-button change-button">
            <i class="txt_M fas fa-chevron-left" @click="prePage" v-bind:style="preBtnStyle"></i>
        </div>
        <div class="next-button change-button">
            <i class="txt_M fas fa-chevron-right" @click="nextPage" v-bind:style="nextBtnStyle"></i>
        </div>


    </div>  
</template>

<script>
import ModalDetails from './ModalDetails';


export default {
    components:{
        ModalDetails,
        
    },
    data(){
        return{

            deg:0,
            topics:this.$store.state.contents[this.$store.state.modalCategory].topics,
            topicsCnt:this.$store.state.contents[this.$store.state.modalCategory].topics.length,
            tpi:this.$store.state.modalTopicIndex
        }
    },
    mounted:function(){
        // console.log(document.getElementById('audio').volume)
        document.getElementById('audio').volume=0.1;
    },
    computed:{
        nextBtnStyle(){
            if(this.tpi != this.topicsCnt - 1){
                return{
                    display:'block'
                }
            }else{
                return{
                    display:'none'
                }
            }
        },
        preBtnStyle(){
            if(this.tpi!= 0){
                return{
                    display:'block'
                }
            }else{
                return{
                    display:'none'
                }
            }
        }
    },
    methods:{

        prePage:function(){

            if(this.tpi!= 0){
                
                this.deg=this.deg+90
                this.tpi=this.tpi-1

            }
        },
        nextPage:function(){

            if(this.tpi != this.topicsCnt - 1){

                this.deg=this.deg-90
                this.tpi=this.tpi+1

            }

            
        },

    }

}
</script>   