<template>
    <div>
    <div class="header">
      <div :class="{'menu-item': true, 'items': show==='A'}" @click="onSee('A')">质量验评</div>
      <div :class="{'menu-item': true, 'items': show==='B'}" @click="onSee('B')">质量检查</div>
      <div :class="{'menu-item': true, 'items': show==='C'}" @click="onSee('C')">试验检测</div>
      <div :class="{'menu-item': true, 'items': show==='D'}" @click="onSee('D')">标准工艺及获奖情况</div>
    </div>
    <div class="body">
      <QualityReview v-if="show==='A'"></QualityReview>
      <QualityInspect v-if="show==='B'"></QualityInspect>
    </div>
  </div>
</template>

<script>
import QualityInspect from "./QualityInspect.vue"
import QualityReview from "./QualityReview.vue"
export default {
    components:{
        QualityInspect,
        QualityReview
    },
    data(){
        return{
            show:"A"
        }
    },
    methods:{
        onSee(v){
            this.show=v
        }
    }
}
</script>