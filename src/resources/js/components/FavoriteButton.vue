<template>
    <div>
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

        //お気に入り追
        addFavorite:function(){
            var maxCont=0;

            //お気に入り数の上限チェック
            for(let i=0; i<localStorage.length;i++){
                let key = localStorage.key(i);

                if(key.includes("_favorite")){
                    maxCont++;
                }
            }

            if(maxCont >= 3){
                alert("お気に入りの上限に達しているため、お気に入りに追加できません。")
                
            }else{
                this.$store.commit('updateFavoriteFlg',this.topic.id)

                
                //imgタグを取得
                var img = document.getElementById(this.topic.image)

                // 画像があればbase64に変換
                if(img!=null){

                    // img -> base64
                    img = this.imageToBase64(img,"img/jpg");
                }else{
                    img=""
                }

                // ローカルストレージに保存
                localStorage.setItem(this.topic.id+"_favorite", JSON.stringify(
                    {id:this.topic.id,
                    title:this.topic.title,
                    image:img,
                    thumbnail:this.topic.thumbnail,
                    owner:this.topic.owner,
                    favorite:this.topic.favorite
                    }
                ));

                this.$store.commit('getFavoriteTopics')
            }




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

        //お気に入り削除
        deleteFavorite:function(){
            
            this.$store.commit('updateFavoriteFlg',this.topic.id)

            localStorage.removeItem(this.topic.id+"_favorite");

            this.$store.commit('getFavoriteTopics')
        }
    }
}
</script>