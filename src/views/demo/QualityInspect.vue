<template>
    <div v-if="flag==1">
        <span @click="to">QualityReview</span>
    </div>
    <QualityReview v-else-if="flag==2"></QualityReview>
</template>

<script>
// import QualityReview from "./QualityReview.vue"
export default {
    components:{
        // QualityReview
        QualityReview:()=>import("./QualityReview.vue"),
    },
    data(){
        return{
            flag:1
        }
    },
    methods:{
        to(){
            this.flag=2
        }
    }
}
</script>