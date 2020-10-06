<template>
    <div class="setting-inner" :class="`setting-inner-${this.$store.state.settingOpenFlg}`">
        <div class="setting-header">
            <div class="back-icon">

                <i class="fas fa-arrow-left" @click="closeSetting"></i>
            </div>
            <p class="m-0">設定</p>
        </div>

        <ul class="list-group list-group-flush pr-2 pl-2">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-video"></i>ムービーを自動再生する</span>
                <toggle-button :sync="true" :value="this.$store.state.autoPlay.movie" :labels="{checked: 'ON', unchecked: 'OFF'}" @change="onChangeMovieEventHandler"></toggle-button>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-music"></i>音楽を自動再生する</span>
                <toggle-button :sync="true" :value="this.$store.state.autoPlay.music" :labels="{checked: 'ON', unchecked: 'OFF'}" @change="onChangeMusicEventHandler"></toggle-button>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="setting-link" @click="deleteHistory"><i class="fas fa-trash-alt"></i>閲覧履歴を全て削除する</a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="setting-link" @click="deleteFavorite"><i class="far fa-bookmark"></i>お気に入りを全て削除する</a>
            </li>

        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            myDataVariable: ''
        }
    },
    methods: {
        onChangeMovieEventHandler: function(state){

            this.$store.commit('setAutoPlaySetting',{name:'movie',value:state.value})
        },
        onChangeMusicEventHandler: function(state){

            this.$store.commit('setAutoPlaySetting',{name:'music',value:state.value})
        },

        deleteHistory:function(){

            var message = "閲覧履歴を全て削除してもいいですか？";

            if(confirm(message)){

                this.$store.commit('deleteHistory')
            }
        },
        deleteFavorite:function(){
            var message = "お気に入りを全て削除してもいいですか？";

            if(confirm(message)){

                this.$store.commit('deleteFavorite')
            }
        },
        closeSetting:function(){
            this.$store.commit('openCloseSettingPage')
        }
    }
}
</script>