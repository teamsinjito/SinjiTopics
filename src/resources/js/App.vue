<template>
    <div>
        <!-- ローディング画面 -->
        <div id="loader" class="w-100 h-100" v-if="!this.$store.state.tabs.length">
            <vue-loading class="icon" type="spin" color="#333"></vue-loading>
        </div>

        <!-- メイン画面 -->
        <div v-if="this.$store.state.tabs.length">
            <!-- ヘッダー項目 -->
            <header class="row w-100 ml-0 mr-0">

                <header-form v-model="inputTxt"/>   

            </header>
            
            <!-- ロゴ -->
            <div id="logo-area">
                <img src="img/logo.png" alt="SinjiTopics">
            </div>

            <!-- 記事一覧 -->
            <main :class="{'open-category':openTabsListFlg}">
                <!-- タブ項目 -->
                <tabs-list :active-tab="activeTab" :filter="inputTxt" @update="activeTab = $event" @updateFlg="openTabsListFlg = $event"></tabs-list>
                
            </main>

            <!-- 記事オープンorクローズボタン -->
            <open-close-icon :flg="openTabsListFlg" @update="openTabsListFlg = $event"></open-close-icon>

        </div>

        <!-- モーダル -->
        <div v-if="this.$store.state.isModal" class="w-100 h-100 modal-view">
            <!-- <p>{{this.$store.state.modalTopic.text}}</p> -->
            <modal></modal>
            
        </div>
        
        <!-- 設定画面 -->
        <div v-if="this.$store.state.settingOpenFlg" class="w-100 setting-wrapper" @click="openCloseSetting">
        </div>
        <setting-page></setting-page>

    </div>
</template>

<script>
import HeaderForm from './components/HeaderForm.vue';
import TabsList from './components/TabsList.vue';
import OpenCloseIcon from './components/OpenCloseIcon';
import Modal from './components/Modal';
import SettingPage from './components/SettingPage';
import { VueLoading } from 'vue-loading-template'

export default {

    components:{
        HeaderForm,
        TabsList,
        OpenCloseIcon,
        Modal,
        SettingPage,
        VueLoading
    },

    data(){
        return{
            inputTxt:"", //テキストボックス入力値

            activeTab:"contents-domestic", //現在表示しているタブ(コンテンツキー)
            openTabsListFlg:false, //記事一覧の表示フラグ

        }
    },

    //DB接続時に使用
    created:function(){

        axios
            .get('/get/index')
            .then((response)=>{
                //タブ一覧取得
                if(response.data.tabs.length){


                    this.$store.commit('setTabs',response.data.tabs)
                    

                }
                if(response.data.topics.length){
                    
                    this.$store.commit('setTopics',response.data.topics)
                }
                this.$store.commit('setIndexedDB')
                this.$store.commit('matchingFavorite')
                this.$store.commit('selectDB',{table:'history'})
                this.$store.commit('selectDB',{table:'favorite'})
                this.$store.commit('matchingSetting')
                
            })
            .catch((err)=>{
                console.log(err)
            })


        
    },
    methods:{
        openCloseSetting:function(){
            this.$store.commit('openCloseSettingPage')
        }
    }


}
</script>