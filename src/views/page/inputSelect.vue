<template>
    <div>
        <a-select
        v-model="result"
        :show-search="true"
        :not-found-content="null"
        :filter-option="true"
        :allowClear="true"
        style="width: 180px"
        placeholder="请选择或输入水果"
        @search="handleSearch" 
        @blur="handleBlur" 
        @change="handleChange"
        >
            <a-select-option
            v-for="(item,index) in list"
            :key="index"
            :value="item.id"
            >
                {{ item.val }}
            </a-select-option>
        </a-select>
        <h1>{{ result }}</h1>
    </div>
</template>
<script>
export default {
    name: "input-select",
    cname: "可输入可选择下拉",
    data() {
        return {

            // 下拉列表
            list:[
                { id: '1', val: '香蕉' },
                { id: '2', val: '苹果' },
                { id: '3', val: '火龙果' },
            ],
            
            // 选择器值(最终数据)
            result: undefined,//选择下拉列表中选项后的值
        }
    },

    methods: {

        handleSearch(value){
            this.handleChange(value)
        },

        handleChange(value){
            console.log(value);
            this.result = (value != null && value != '') ? value : undefined
        },
        
        handleBlur(value){
            console.log(value);
            this.result = value;
        },
    }
}

</script>
