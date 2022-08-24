<template>
    <div>
        <a-form-model ref="formTable">
        <a-table :data-source="tableData" :columns="columns">
            <template slot="tableItem" slot-scope="text,record,index">
                <a-form-model-item :prop="'tableItem.'+index" :rules="rules.tableItem">
                    <a-input v-model="record['tableItem']"></a-input>
                </a-form-model-item>
            </template>
        </a-table>
    </a-form-model>
    <a-button type="primary" @click="getFormTableProp">获取prop</a-button>
    <a-button type="primary" @click="submit">验证table</a-button>
    <a-button type="primary" @click="resetFormTable">重置table</a-button>
    </div>
</template>

<script>
export default{
    name: "formTable",
    data() {
        return {
            tableData:[
                {
                    tableItem:""
                },
                {
                    tableItem:""
                }
            ],
            columns:[
                {
                    title:"列数据",
                    dataIndex:"tableItem",
                    scopedSlots:{
                        customRender:"tableItem"
                    }
                }
            ],
            rules:{
                tableItem:[
                    {
                        validator:this.validEmpty('tableItem','请输入列数据'),trigger:'change'
                    }
                ]
            }
        }
    },
    methods:{
        // 获取到整个表单的props，提供表单校验
        getFormTableProp(){
            let len=this.tableData.length
            let keys=Object.keys(this.rules)
            let resArr=[]
            for (let i = 0; i < len; i++) {
                resArr=[...resArr,...keys.map((item)=>`${item}.${i}`)]
            }
            console.log(resArr);
            return resArr;
        },
        // 效验表格信息
        validFormTable(){
            let resArr=this.getFormTableProp();
            return new Promise((resolve,reject)=>{
                let error=[]
                this.$refs.formTable.validateField(resArr,function(errorMsg){
                  errorMsg&&error.push(errorMsg)
                })
                console.log("error",error);
                
                if(error.length==0){
                    resolve()
                }else{
                    resolve(error)
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // 重置校验
        resetFormTable(){
            let resArr=this.getFormTableProp();
            this.$refs.formTable.clearValidate(resArr)
        },
        // 提交
        submit(){
            console.log(this.validFormTable());
            this.validFormTable().then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log("errrrr",err);
            })
        },
        validEmpty(name,tips){
            return (rule,value,callback)=>{
                let index=+rule.field.split('.')[1];
                let data =this.tableData[index][name];
                if(!data){
                    callback(tips||'请输入内容')
                }else{
                    callback()
                }
            }
        }
    }
}
</script>