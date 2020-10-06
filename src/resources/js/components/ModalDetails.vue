<template>
    <div class="container-wrapper h-100 w-100" v-bind:style="cubeStyle">
        <div class="modal-header-close">            
            <i class="fas fa-times txt_L" @click="closeMovie"></i>
        </div>
        <div class="text-area w-100" v-bind:style="pageStyle" @click="pausedMovie">
            <!-- details -->
            <div class="w-100 h-100 movie-area" :class="`paused-${paused}`">
                
                <movie-endroll v-if="topic.animation_type == 'end-roll'" :text="topic.text"></movie-endroll>
            </div>
            <!-- <p class="txt_M w-100 pl-3 pr-3">{{topic.text}}</p> -->

            <div v-if="paused" class="modal-play-area">
                <i class="fas fa-play txt_L"></i>
            </div>
        </div>
        <div class="modal-footer-area w-100">
            <p class="txt_M topic-title w-100 m-0 ml-3">
                {{topic.title}}
            </p>
            <div class="other-info w-100">
                <div class="txt_M w-75 m-0 ml-3 audio-info">
                    <p class="cd-icon">
                        <i class="fas fa-compact-disc mr-1"></i>
                    </p>
                    <p class="cd-name">
                        {{topic.bgm_created_name}}
                    </p>
                </div>
                <div class="w-25 manual-area txt_M">
                    <p class="speaker-icon">
                        <i v-if="isPlay" class="fas fa-volume-up" @click="audioPlay"></i>
                        <i v-else class="fas fa-volume-mute" @click="audioPlay"></i>
                    </p>
                    <favorite-button :topic="topic"></favorite-button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import FavoriteButton from './FavoriteButton.vue';
import MovieEndroll from './MovieEndroll';

export default {
    components:{
        FavoriteButton,
        MovieEndroll
    },
    props:{
        surface:{
            type:Number
        },
        topic:{
            type:Object
        },
        deg:{
            type:Number
        }
    },
    data() {
        return {
            pageStyle: {
                // 背景変更用スタイル
                backgroundImage: "", // 背景読み込み前なので空白    
            },

            paused:true,
            isPlay:true,
            showFlg:false

        };
    },
    computed:{
        cubeStyle(){

            var nextDeg =90* (this.surface - this.$store.state.modalTopicIndex) + this.deg
            var tz
            
            if(nextDeg == 0){
                this.paused = !this.$store.state.autoPlay.movie
                this.isPlay=this.$store.state.autoPlay.music


                this.$store.commit('getHistoryTopics',this.topic)
            }
            else{
                this.paused=true
            }

            if(nextDeg == 0 || nextDeg == 90 || nextDeg == -90){
                
                //画面サイズにより調整
                if(window.innerWidth >= 1200){

                    tz="570px"

                }else if(window.innerWidth >= 992){

                    tz="480px"

                }else if(window.innerWidth >= 768){

                    tz="360px"

                }else if(window.innerWidth >= 576){

                    tz="270px"

                }else{

                    tz="50vw"

                }

            }else{
                if(window.innerWidth >= 1200){

                    tz="-285px"

                }else if(window.innerWidth >= 992){

                    tz="-240px"

                }else if(window.innerWidth >= 768){

                    tz="-180px"

                }else if(window.innerWidth >= 576){

                    tz="-135px"

                }else{

                    tz="-25vw"

                }

            }

            return{

                transform: 'rotateY('+nextDeg +'deg) translateZ('+tz+')',

            }
        }
    },
    created:function() {
        
        this.pageStyle.backgroundImage = "url('" + this.topic.image + "')"; 

    },

    methods:{
        closeMovie:function(){

            //履歴追加
            this.$store.state.modalHistTopics.forEach(topic => {
                
                this.$store.commit('insertDB',{topic:topic,table:'history'})
            }) 

            //お気に入りモーダルにてお気に入り解除記事をDBに反映
            this.$store.state.modalFavDeleteIds.forEach(topicId => {

                this.$store.commit('deleteDB',{table:'favorite',data:topicId})
            });

            this.$store.state.modalFavDeleteIds=[]
            this.$store.state.modalHistTopics=[]

            this.$store.commit('openCloseModal',{topicindex:"",category:""})
        },

        pausedMovie:function(){
            this.paused=!this.paused
            if(this.paused){
                document.getElementById('audio').pause()
            }else{
                if(this.isPlay){
                    document.getElementById('audio').play()
                }
            }
        },
        audioPlay:function(){
            this.isPlay=!this.isPlay
            if(this.isPlay){
                if(!this.paused){
                    document.getElementById('audio').play()
                }
            }else{
                document.getElementById('audio').pause()
            }
        }
    }
}
</script>