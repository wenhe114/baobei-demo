
<template>
    <div>
        {{search}}
        <avue-crud :option="option" :search.sync="search" :data="data" ></avue-crud>
    </div>
</template>
<script>
export default {
  name: "avueCrudTable",
  data(){
    return {
       search:{
         name:'small'
       },
       data:[{
         name:'张三'
       }],
       option:{
          column: [{
            label: '姓名',
            prop: 'name',
            search:true,
          }]
       }
    }
  }
}
</script>
