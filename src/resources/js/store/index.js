import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {

        tabs:[  //タブ一覧（AWSテスト用）
            {key:"contents-domestic",name:"国内",default:"active"},
            {key:"contents-overseas",name:"国際",default:""},
            {key:"contents-economy",name:"政治・経済",default:""},
            {key:"contents-technology",name:"IT・技術",default:""},
            {key:"contents-sports",name:"スポーツ",default:""},
            {key:"contents-entertainment",name:"エンタメ",default:""},
            {key:"contents-history",name:"履歴",default:""},
            {key:"contents-favorite",name:"お気に入り",default:""}
        ],
        contents:{  //記事（AWSテスト用）
            domestic:{
                key:"contents-domestic",
                topics:[
                    {
                        id:"topics001",
                        title:"タイトル001",
                        image:"uver paper.jpg",
                        thumbnail:"standard",
                        text:"本文001",
                        owner:"作者001",
                        favorite:false
                    },
                    {
                        id:"topics002",
                        title:"タイトル002",
                        image:"ねこ黒.jpg",
                        thumbnail:"h-large",
                        text:"本文002",
                        owner:"作者002",
                        favorite:false
                    },
                    {
                        id:"topics003",
                        title:"タイトル003",
                        image:"",
                        thumbnail:"title-only",
                        text:"本文003",
                        owner:"作者003",
                        favorite:false
                    },
                    {
                        id:"topics004",
                        title:"タイトル004",
                        image:"large.jpg",
                        thumbnail:"w-large",
                        text:"本文004",
                        owner:"作者004",
                        favorite:false
                    },
                    {
                        id:"topics005",
                        title:"タイトル005",
                        image:"background_色鉛筆.jpg",
                        thumbnail:"w-large",
                        text:"本文005",
                        owner:"作者005",
                        favorite:false
                    },
                    {
                        id:"topics006",
                        title:"タイトル006",
                        image:"",
                        thumbnail:"title-only",
                        text:"本文006",
                        owner:"作者006",
                        favorite:false
                    },
                    {
                        id:"topics007",
                        title:"タイトル007",
                        image:"",
                        thumbnail:"title-only",
                        text:"本文007",
                        owner:"作者007",
                        favorite:false
                    },
                ]
            },
            overseas:{
                key:"contents-overseas",
                topics:[
                ]
            },
            economy:{
                key:"contents-economy",
                topics:[
                    {
                        id:"topics0073",
                        title:"タイトル0073",
                        image:"",
                        thumbnail:"title-only",
                        text:"本文003",
                        owner:"作者0073",
                        favorite:false
                    },
                ]
            },
            technology:{
                key:"contents-technology",
                topics:[]      
            },
            sports:{
                key:"contents-sports",
                topics:[]
            },
            entertainment:{
                key:"contents-entertainment",
                topics:[]
            },
            history:{
                key:"contents-history",
                topics:[]
            },
            favorite:{
                key:"contents-favorite",
                topics:[]
            },

        }
    
    },

    mutations: {

        //お気に入り記事を取得
        getFavoriteTopics:function (state) {

            state.contents.favorite.topics=[];

            // ローカルストレージ
            for(let i =0 ; i < localStorage.length ; i++){
                let key = localStorage.key(i);

                //お気に入りのみかつ配列に存在していないものを抽出
                if(key.includes("_favorite") && state.contents.favorite.topics.indexOf(localStorage.getItem(key)) == -1){    

                    state.contents.favorite.topics.push(JSON.parse(localStorage.getItem(key)));
                
                }
            }


        },
        //履歴記事を取得
        getHistoryTopics:function (state) {

            state.contents.history.topics=[];

            // ローカルストレージ
            for(let i =localStorage.length-1 ; i >= 0  ; i--){
                let key = localStorage.key(i);

                //お気に入りのみかつ配列に存在していないものを抽出
                if(key.includes("_history")){    

                    state.contents.history.topics.push(JSON.parse(localStorage.getItem(key)));
                
                }
            }

        },

        //お気に入りフラグ更新
        updateFavoriteFlg:function(state,id){
            //取得した記事をループ
            for(var category in state.contents){

                for(let i=0; i<state.contents[category].topics.length; i++){

                    if(state.contents[category].topics[i].id == id){
                        state.contents[category].topics[i].favorite=!state.contents[category].topics[i].favorite;
                    }
                }
            }
        },

        //ローカルストレージにあるお気に入り記事とDB取得記事の突合
        //お気に入り済みフラグ更新
        matchingFavorite:function(state){

            //取得した記事をループ
            for(var category in state.contents){

                for(let i=0; i<state.contents[category].topics.length; i++){

                    //記事がお気に入り済みの場合、favoriteをtrueに更新
                    if(localStorage.getItem(state.contents[category].topics[i].id+"_favorite")!=null){
                        state.contents[category].topics[i].favorite=true;

                    }
                }

            }
        }


    }
})

export default store;