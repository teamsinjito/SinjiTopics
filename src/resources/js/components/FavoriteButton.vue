<template>
    <div class="favorite-button-area">
        <!-- お気に入り済 -->
        <i v-if="topic.favorite" class="fas fa-bookmark" @click="deleteFavorite"></i>

        <i v-else class="far fa-bookmark" @click="addFavorite"></i>
    </div>
</template>

<script>
export default {
    props:{
        
        topic:{
            type:Object //記事
        }
    },

    methods:{

        //お気に入り追加
        addFavorite:function(){

            this.$store.commit('updateFavoriteFlg',{id:this.topic.id,val:true})

            if((this.$store.state.isModal && this.$store.state.modalCategory =='favorite')){

                this.$store.commit('spliceFavIdWithModal',this.topic.id)

            }else{
                    
                this.$store.commit('insertDB',{topic:this.topic,table:'favorite'})
            }

        },

        //お気に入り削除
        deleteFavorite:function(){

            this.$store.commit('updateFavoriteFlg',{id:this.topic.id,val:false})

            if(this.$store.state.isModal && this.$store.state.modalCategory =='favorite'){

                this.$store.commit('getDeleteFavWithModal',this.topic.id)
                

            }else{
                this.$store.commit('deleteDB',{table:'favorite',data:this.topic.id})
            }


        }
    }
}
</script>