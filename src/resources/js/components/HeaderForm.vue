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
        <div id="setting-icon" @click="openSetting">
            <span>
                <i class="fas fa-cog"></i>
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
        openSetting:function(){
            this.$store.commit('openCloseSettingPage')
        }
    }

}
</script>