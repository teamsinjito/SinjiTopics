<template>
        
    <!-- テンプレート① standard -->
    <div v-if="topic.thumbnail_type == 'standard' && topic.title.includes(filter)" class="card standard-style" style="grid-row: span 2; grid-column: span 1;">
        <!-- 画像イメージ -->
        <div class="img-wrapper">
            <img  class="card-img-top" :src="topic.image">
        </div>

        <!-- 本文 -->
        <div class="card-body">
            <a href="#" class="card-title txt_S" @click="openMovie(topic)">{{topic.title}}</a>
        </div>

        <!-- 出典およびお気に入りボタン -->
        <div class="card-bottom pl-3 pr-3">
            <small class="txt_XXS">
                <span>{{topic.upload}}</span>
                <br>
                <a :href="topic.url" target="_blank" rel="noopener noreferrer">{{topic.owner}}</a>
            </small>
            <favorite-button :topic="topic"></favorite-button>
        </div>

    </div>

    <!-- テンプレート② title-only -->
    <div v-else-if="topic.thumbnail_type == 'title-only' && topic.title.includes(filter)" class="card title-only-style" style="grid-row: span 1; grid-column: span 1;">

        <!-- 本文 -->
        <div class="card-body">
            <a href="#"  class="card-title txt_S" @click="openMovie(topic)">{{topic.title}}</a>
        </div>

        <!-- 出典およびお気に入りボタン -->
        <div class="card-bottom pl-3 pr-3">
            <small class="txt_XXS">                
                <span>{{topic.upload}}</span>
                <br>
                <a :href="topic.url" target="_blank" rel="noopener noreferrer">{{topic.owner}}</a></small>
            <favorite-button :topic="topic"></favorite-button>
        </div>

    </div>

    <!-- テンプレート③ h-large -->
    <div v-else-if="topic.thumbnail_type == 'h-large' && topic.title.includes(filter)" class="card h-large-style" style="grid-row: span 3; grid-column: span 1;">
        <!-- 画像イメージ -->
        <div class="img-wrapper">
            <img  class="card-img-top" :src="topic.image">
        </div>

        <!-- 本文 -->
        <div class="card-body">
            <a href="#"  class="card-title txt_S" @click="openMovie(topic)">{{topic.title}}</a>
        </div>

        <!-- 出典およびお気に入りボタン -->
        <div class="card-bottom pl-3 pr-3">
            <small class="txt_XXS">                
                <span>{{topic.upload}}</span>
                <br>
                <a :href="topic.url" target="_blank" rel="noopener noreferrer">{{topic.owner}}</a></small>
            <favorite-button :topic="topic"></favorite-button>
        </div>

    </div>

    <!-- テンプレート④ w-large-only -->
    <div v-else-if="topic.thumbnail_type == 'w-large' && topic.title.includes(filter)" class="card w-large-style" style="grid-row: span 2; grid-column: span 2;">

        <!-- 画像イメージ -->
        <div class="img-wrapper">
            <img  class="card-img-top" :src="topic.image">
        </div>

        <!-- オーバーレイ -->
        <div class="card-img-overlay">

            <!-- 本文 -->
            <a href="#"  class="card-title line-limit txt_M" @click="openMovie(topic)">{{topic.title}}</a>

            <!-- 出典およびお気に入りボタン -->
            <div class="card-bottom">
                <small class="txt_XXS">                
                    <span>{{topic.upload}}</span>
                    <br>
                    <a :href="topic.url" target="_blank" rel="noopener noreferrer">{{topic.owner}}</a></small>
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
        category:{
            type:String //カテゴリー
        },
        filter:{
            type:String //検索文字列
        },
        index:{
            type:Number
        }
    },
    methods:{
        openMovie:function(topic){


            this.$store.commit('openCloseModal',{topicIndex:this.index,category:this.category.substr(9)})

        }
        
    }

}
</script>