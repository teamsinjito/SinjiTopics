<template>
    <div class="offset-xl-3 col-xl-6 offset-sm-2 col-sm-8 col-12 wrapper mb-5">

        <!-- 検索ボックスラッパー -->
        <div class="text-wrapper">
            <!-- テキストボックス -->
            <input 
                type="text" 
                class="w-100" 
                placeholder="Topicを検索"
                v-model="inputValue"
            >
            <span id="search-icon">
                <i class="fas fa-search"></i>
            </span>
        </div>

        <!-- リロードボタン -->
        <div id="redo-icon" @click="redo">
            <span>
                <i class="fas fa-redo"></i>
            </span>
        </div>

        <!-- 設定ボタン -->
        <div id="setting-icon" @click="deleteHistory">
            <span>
                <i class="far fa-trash-alt"></i>
            </span>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        value:{
            type:String  //検索ボックスへの入力値
        }
    },
    computed:{

        // 検索ボックスへの入力値を返す
        inputValue:{
            get(){
                return this.value;
            },
            set(value){
                this.$emit('input',value);
            }
        }
    },
    methods:{
        redo:function(){
            location.reload();
        },
        deleteHistory:function(){

            var message = "履歴を全て削除してもいいですか？";

            if(confirm(message)){

                this.$store.commit('deleteHistory')
            }
        }
    }

}
</script>