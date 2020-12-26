import Vue from 'vue'
import Vuex from 'vuex'
import Dexie from 'dexie';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tabs:[],
        contents:{},　//記事
        indexedDB:null,  //indexedDB
        isModal:false, //モーダル表示フラグ
        modalTopicIndex:"", //モーダル表示用記事インデックス
        modalCategory:"",   //モーダル表示用カテゴリー
        modalFavDeleteIds:[], //モーダルお気に入り削除記事ID
        modalHistTopics:[], //履歴追加用
        settingOpenFlg:false, //設定画面表示フラグ
        autoPlay:{  //自動再生制御フラグ
            movie:true,
            music:true
        }
    },

    mutations: {

        //取得してきたタブ一覧をセット
        setTabs:function(state,val){
            state.tabs=val

            for(let i = 0; i<val.length; i++){

                Vue.set(state.contents,val[i].key.substr(9),{key:val[i].key,topics:[]})
            }

        },

        //取得してきた記事をセット
        setTopics:function(state,vals){

            for(let i = 0; i<vals.length; i++){
                state.contents[vals[i].key.substr(9)].topics.push(vals[i])
            }

        },

        //indexedDB構築
        setIndexedDB:function(state){

            //DB構築
            state.indexedDB = new Dexie("MyTopicsStorage");
            state.indexedDB.version(1).stores({
                favorite:"&id,image,owner,thumnail_type,title,text,url,bgm_created_name,bgm_name,animation_type,favorite,upload,created_at",
                history:"&id,image,owner,thumnail_type,title,text,url,bgm_created_name,bgm_name,animation_type,favorite,upload,created_at",
                autoPlay:"name,value"
            });
        },

        //indexedDBにレコード追加
        insertDB:function(state,obj){

            state.indexedDB[obj.table].orderBy('id').count()
             // 検索結果をカウント
            .then((recordCnt)=>{

                if(recordCnt <= 30){

                    const date = new Date();
                    var fav
                    if(obj.table=="history"){
                        fav = obj.topic.favorite
                    }else{
                        fav = true
                    }
                    //insert
                    state.indexedDB[obj.table].put({
                        id:obj.topic.id,
                        image:obj.topic.image,
                        owner:obj.topic.owner,
                        thumbnail_type:obj.topic.thumbnail_type,
                        title:obj.topic.title,
                        text:obj.topic.text,
                        url:obj.topic.url,
                        bgm_created_name:obj.topic.bgm_created_name,
                        bgm_name:obj.topic.bgm_name,
                        animation_type:obj.topic.animation_type,
                        favorite:fav,
                        upload:obj.topic.upload,
                        created_at:date.toLocaleString()
                    }).then(()=>{

                        this.commit('selectDB',{table:obj.table})

                    }).catch((error)=>{
                        alert("ローカルストレージの容量がいっぱいです。")
                    })

                }else{
                    alert("ブラウザストレージの容量がいっぱいです。削除してください。")

                }
            })


        },

        //indexedDBからレコード取得
        selectDB:function(state,obj){
            state.contents[obj.table].topics=[];

            state.indexedDB[obj.table].orderBy('created_at').reverse().toArray()
            .then((res)=>{

                state.contents[obj.table].topics=res

            })
            
        },

        //indexedDBからレコード削除
        deleteDB:function(state,obj){

            state.indexedDB[obj.table].delete(obj.data)
            .then((res)=>{

                this.commit('selectDB',{table:obj.table})

            })

        },

        //お気に入りフラグ更新
        updateFavoriteFlg:function(state,obj){
            //取得した記事をループ
            for(var category in state.contents){

                for(let i=0; i<state.contents[category].topics.length; i++){

                    if(state.contents[category].topics[i].id == obj.id){
                        state.contents[category].topics[i].favorite=obj.val;
                    }
                }
            }


        },

        //ローカルストレージにあるお気に入り記事とDB取得記事の突合
        //お気に入り済みフラグ更新
        matchingFavorite:function(state){
            state.indexedDB.favorite.each((res)=>{
                

                for(var category in state.contents){
                    for(let i=0; i<state.contents[category].topics.length; i++){

                        if(state.contents[category].topics[i].id == res.id){

                            state.contents[category].topics[i].favorite=true;
                        }
                    }
                }
            })

        },

        //履歴削除
        deleteHistory:function(state){       
            state.indexedDB.history.clear().then(()=>{
                state.contents.history.topics=[]
            })
        },

        //お気に入り削除
        deleteFavorite:function(state){
            state.indexedDB.favorite.clear().then(()=>{
                state.contents.favorite.topics=[]
            })

            for(var category in state.contents){
                for(let i=0; i<state.contents[category].topics.length; i++){



                        state.contents[category].topics[i].favorite=false;
                    
                }
            }
        },

        //モーダルウィンドウ表示、非表示
        openCloseModal:function(state,obj){

            state.isModal=!state.isModal
            state.modalTopicIndex=obj.topicIndex
            state.modalCategory=obj.category
        },

        //お気に入りモーダルにてお気に入り削除記事ID取得
        getDeleteFavWithModal:function(state,id){

            state.modalFavDeleteIds.push(id)

        },

        getHistoryTopics:function (state,topic) {
            state.modalHistTopics.push(topic)  
        },

        //お気に入りモーダルにてお気に入り削除記事から除く
        spliceFavIdWithModal:function(state,id){

            var index = state.modalFavDeleteIds.indexOf(id);
            if (index > -1) {
                state.modalFavDeleteIds.splice(index, 1);
            }

        },

        //設定画面オープン
        openCloseSettingPage:function(state) {
            state.settingOpenFlg=!state.settingOpenFlg
        },

        //自動再生制御設定
        setAutoPlaySetting:function(state,obj){
            state.autoPlay[obj.name]=obj.value
            state.indexedDB.autoPlay.put({
                name:obj.name,
                value:obj.value

            })
        },

        matchingSetting:function(state) {
            state.indexedDB.autoPlay.each((res)=>{
                
                state.autoPlay[res.name]=res.value

            })
        }


    },
})

export default store;