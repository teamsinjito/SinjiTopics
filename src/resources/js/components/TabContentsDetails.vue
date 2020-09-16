<template>
        
    <!-- テンプレート① standard -->
    <div v-if="topic.thumbnail == 'standard' && topic.title.includes(filter)" class="card standard-style" style="grid-row: span 2; grid-column: span 1;">
        <!-- 画像イメージ -->
        <div class="img-wrapper">
            <img v-if="topic.image.includes('data:image/')" :id="topic.image" class="card-img-top" :src="topic.image">
            <img v-else :id="topic.image" class="card-img-top" :src='`../storage/img/sample/${topic.image}`'>
        </div>

        <!-- 本文 -->
        <div class="card-body">
            <a href="#" class="card-title txt_S" @click="openMovie(topic)">{{topic.title}}</a>
        </div>

        <!-- 出典およびお気に入りボタン -->
        <div class="card-bottom pl-3 pr-3">
            <small>{{topic.owner}}</small>
            <favorite-button :topic="topic"></favorite-button>
        </div>

    </div>

    <!-- テンプレート② title-only -->
    <div v-else-if="topic.thumbnail == 'title-only' && topic.title.includes(filter)" class="card title-only-style" style="grid-row: span 1; grid-column: span 1;">

        <!-- 本文 -->
        <div class="card-body">
            <a href="#"  class="card-title txt_S" @click="openMovie(topic)">{{topic.title}}</a>
        </div>

        <!-- 出典およびお気に入りボタン -->
        <div class="card-bottom pl-3 pr-3">
            <small>{{topic.owner}}</small>
            <favorite-button :topic="topic"></favorite-button>
        </div>

    </div>

    <!-- テンプレート③ h-large -->
    <div v-else-if="topic.thumbnail == 'h-large' && topic.title.includes(filter)" class="card h-large-style" style="grid-row: span 3; grid-column: span 1;">
        <!-- 画像イメージ -->
        <div class="img-wrapper">
            <img v-if="topic.image.includes('data:image/')" :id="topic.image" class="card-img-top" :src="topic.image">
            <img v-else :id="topic.image" class="card-img-top" :src='`../storage/img/sample/${topic.image}`'>
        </div>

        <!-- 本文 -->
        <div class="card-body">
            <a href="#"  class="card-title txt_S" @click="openMovie(topic)">{{topic.title}}</a>
        </div>

        <!-- 出典およびお気に入りボタン -->
        <div class="card-bottom pl-3 pr-3">
            <small>{{topic.owner}}</small>
            <favorite-button :topic="topic"></favorite-button>
        </div>

    </div>

    <!-- テンプレート④ w-large-only -->
    <div v-else-if="topic.thumbnail == 'w-large' && topic.title.includes(filter)" class="card w-large-style" style="grid-row: span 2; grid-column: span 2;">

        <!-- 画像イメージ -->
        <div class="img-wrapper">
            <img v-if="topic.image.includes('data:image/')" :id="topic.image" class="card-img-top" :src="topic.image">
            <img v-else :id="topic.image" class="card-img-top" :src='`../storage/img/sample/${topic.image}`'>
        </div>

        <!-- オーバーレイ -->
        <div class="card-img-overlay">

            <!-- 本文 -->
            <a href="#"  class="card-title line-limit txt_M" @click="openMovie(topic)">{{topic.title}}</a>

            <!-- 出典およびお気に入りボタン -->
            <div class="card-bottom">
                <small>{{topic.owner}}</small>
                <favorite-button :topic="topic"></favorite-button>
            </div>

        </div>

    </div>             
    


</template>

<script>
import FavoriteButton from './FavoriteButton.vue';

export default {
    components:{
        FavoriteButton
    },
    props:{
        
        topic:{
            type:Object //記事
        },
        filter:{
            type:String //検索文字列
        }
    },
    methods:{
        openMovie:function(topic){
                    
            var maxCont=0;
            var fHistory
            //imgタグを取得
            var img = document.getElementById(this.topic.image)

            // 画像があればbase64に変換
            if(img!=null){

                // img -> base64
                img = this.imageToBase64(img,"img/jpg");
            }else{
                img=""
            }

            if(localStorage.getItem(this.topic.id+"_history")!=null){
                localStorage.removeItem(this.topic.id+"_history");
            }else{
                

                //お気に入り数の上限チェック
                for(let i =localStorage.length-1 ; i >= 0  ; i--){
                    let key = localStorage.key(i);

                    if(key.includes("_history")){
                        fHistory=key
                        maxCont++;

                    }
                }
                
            }

            if(maxCont >= 6){
                localStorage.removeItem(fHistory);
            }


            // ローカルストレージに保存
            localStorage.setItem(this.topic.id+"_history", JSON.stringify(
                {id:this.topic.id,
                title:this.topic.title,
                image:img,
                thumbnail:this.topic.thumbnail,
                owner:this.topic.owner,
                favorite:this.topic.favorite
                }
            ));

            this.$store.commit('getHistoryTopics')

        },

        //画像をBase64に変換
        imageToBase64:function(img,mim_type){
            var canvas = document.createElement('canvas');
            canvas.width=img.width;
            canvas.height=img.height;

            var ctx=canvas.getContext('2d');
            ctx.drawImage(img,0,0);

            return canvas.toDataURL(mim_type);
        },
        
    }

}
</script>