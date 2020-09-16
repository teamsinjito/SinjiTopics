<template>
    <div class="h-100">

        <!-- タブ一覧 -->
        <nav class="nav-wrapper">
            <ul class="nav nav-tabs" :class="activeTab">
                <li v-for="(item,index) in this.$store.state.tabs" :key="index" class="nav-item" :class=item.key>
                    <a :href=item.key @click="getActive(item.key)" class="nav-link" :class=item.default data-toggle="tab">
                        {{item.name}}
                    </a>
                </li>
            </ul>
        </nav>

        <!-- タブコンテンツ -->
        <section class="tab-contents">
            <transition name="slide-fade" :key="index" v-for="(content,index) in this.$store.state.contents">
                <div class="tab-content" v-show="activeTab == content.key">
                    
                    <!-- 記事 -->
                    <div class="grid-containers">
                        <tab-contents-details :key="topic.id" :filter=filter v-for="topic in content.topics" :topic="topic"></tab-contents-details>
                    </div>


                </div>            
            </transition>
        </section>
    </div>
</template>

<script>
import TabContentsDetails from './TabContentsDetails.vue';

export default {

    components:{
        TabContentsDetails
    },

    props:{

        activeTab:{ 
            type:String　//現在表示しているタブ名
        },
        filter:{
            type:String //検索文字列
        }

    },

    methods:{
        //現在表示しているタブ取得および切り替え
        getActive:function(active){

            this.$emit('update',active)
            this.$emit('updateFlg',true)

        }
    }
}
</script>