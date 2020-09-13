<template>
    <div class="h-100">
        <nav class="nav-wrapper">
            <ul class="nav nav-tabs" :class="activeTab">
                <li v-for="(item,index) in tabItems" :key="index" class="nav-item" :class=contents[index].key>
                    <a :href=contents[index].key @click="getActive(contents[index].key)" class="nav-link" :class=item.default data-toggle="tab">
                        {{item.name}}
                    </a>
                </li>
            </ul>
        </nav>
        <section class="tab-contents">
            <transition name="slide-fade" :key="index" v-for="(content,index) in contents">
                <div class="tab-content" v-show="activeTab == content.key">
                    
                    <tab-contents-details :contentTopics="content.topics"></tab-contents-details>


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
        tabItems:{
            type:Array
        },
        activeTab:{
            type:String
        },
        contents:{
            type:Array
        }
    },

    methods:{
        //現在表示しているタブ取得
        getActive:function(active){

            this.$emit('update',active)
            this.$emit('updateFlg',true)

        }
    }
}
</script>