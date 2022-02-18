<template>
    <div>倒计时组件{{test}}</div>
</template>
<script>
export default {
    name:"downTime",
    cname:"倒计时组件",
    data(){
        let test="1"
        return{
            test
        }
    },
    mounted(){
        console.log(this.test);
        setTimeout(()=>{
            this.test=111
            console.log(this.test);
        },3000)
    }
}
</script>