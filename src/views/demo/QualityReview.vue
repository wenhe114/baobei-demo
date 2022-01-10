<template>
    <div v-if="flag==1">
        <span @click="to">QualityInspect</span>
    </div>
    <QualityInspect v-else-if="flag==2"></QualityInspect>
</template>

<script>
// import QualityInspect from "./QualityInspect.vue"
export default {
    components:{
        QualityInspect:()=>import("./QualityInspect.vue"),
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