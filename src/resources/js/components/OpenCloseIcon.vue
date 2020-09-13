<template>
    <div class="open-close">
        <a href="#" @click="openClose" class="btn btn--circle btn--circle-c btn--shadow"><i class="fas fa-plus" :class="{'angle':flg}"></i></a>
    </div>
</template>

<script>
export default {
    props:{
        flg:{
            type:Boolean
        }
    },

    methods:{
        //開閉状態のフラグを更新
        openClose:function(){

            this.$emit('update',!this.flg)
        }
    }
}
</script>