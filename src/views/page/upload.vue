<template>
    <div>
        <el-upload :before-upload="beforeUpload" action="http://192.168.201.86:7001/upload/cover">
            <el-button>选择文件</el-button>
        </el-upload>
        <el-button @click="uploadFile">上传到服务器</el-button>
    </div>
</template>

<script>
import httpUpload from "http-upload-file"
export default {
    name:"upload",
    cname:"上传请求",
    data(){
        return{
            file:{}
        }
    },
    methods:{
        beforeUpload(file){
            console.log(file);
            this.file=file
            return false
        },
        uploadFile(){
            
            var httpupload=new httpUpload({url:"http://192.168.201.86:7001/upload/cover",body:{
                cover:this.file
            },success:(res)=>{
                console.log(res);
            },progress(val){
                // 进度
                console.log(val);
            }
            })
            console.log({cover:this.file});
            httpupload.request()
        }
    }
}
</script>