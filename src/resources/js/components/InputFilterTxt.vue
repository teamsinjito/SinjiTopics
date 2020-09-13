<template>
    <div>
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
</template>

<script>
export default {
    props:{
        value:{
            type:String
        }
    },
    computed:{
        inputValue:{
            get(){
                return this.value;
            },
            set(value){
                this.$emit('input',value);
            }
        }
    },

}
</script>