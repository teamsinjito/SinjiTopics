<template>
    <div>
        <!-- ローディング画面 -->
        <div id="loader" class="w-100 h-100" v-if="!tabs.length">
            <vue-loading class="icon" type="spin" color="#333"></vue-loading>
        </div>

        <!-- メイン画面 -->
        <div v-if="tabs.length">
            <!-- ヘッダー項目 -->
            <header class="row w-100 ml-0 mr-0">
                <div class="offset-xl-3 offset-1 col-xl-6 col-10 wrapper mt-5 mb-5">
                    <!-- テキストボックス -->
                    <input-filter-txt v-model="inputTxt"/>   

                </div>
            </header>
            
            <!-- ロゴ -->
            <div id="logo-area">
                <img src="img/logo.png" alt="SinjiTopics">
            </div>

            <!-- 記事一覧 -->
            <main :class="{'open-category':openTabsListFlg}">
                <!-- タブ項目 -->
                <tabs-list :tab-items="tabs" :active-tab="activeTab" :contents="contents" @update="activeTab = $event" @updateFlg="openTabsListFlg = $event"></tabs-list>
                
            </main>

            <!-- 記事オープンorクローズボタン -->
            <open-close-icon :flg="openTabsListFlg" @update="openTabsListFlg = $event"></open-close-icon>

        </div>
    </div>
</template>

<script>
import InputFilterTxt from './components/InputFilterTxt.vue';
import TabsList from './components/TabsList.vue';
import OpenCloseIcon from './components/OpenCloseIcon';
import { VueLoading } from 'vue-loading-template'

export default {

    components:{
        InputFilterTxt,
        TabsList,
        OpenCloseIcon,
        VueLoading
    },

    data(){
        return{
            inputTxt:"", //テキストボックス入力値
            tabs:[], //タブ一覧,
            activeTab:"contents-domestic", //現在表示しているタブ(コンテンツキー)
            openTabsListFlg:false, //記事一覧の表示フラグ
            contents:[   //記事
                {key:"contents-domestic",topics:[]}, //国内
                {key:"contents-overseas",topics:[]}, //国外
                {key:"contents-economy",topics:[]}, //政治・経済
                {key:"contents-technology",topics:[]}, //IT・技術
                {key:"contents-sports",topics:[]}, //スポーツ
                {key:"contents-entertainment",topics:[]}, //エンタメ
                {key:"contents-history",topics:[]}, //履歴
                {key:"contents-favorite",topics:[]}, //お気に入り
            ],
        }
    },

    created:function(){
        var data=[];
        axios
            .get('/get/index')
            .then((response)=>{

                //タブ一覧取得
                if(response.data.tabs.length){

                    this.tabs=response.data.tabs

                }
                
            })
        
    },

}
</script>