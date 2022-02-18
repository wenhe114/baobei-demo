<template>
    <div class="route-list">
        <!-- <router-link class="route-item" v-for="(item) in pageRoutes" :key="item.name" :to="{path:item.path}">{{item.name}}</router-link> -->
    </div>
</template>

<script>
const pages=require.context("./page", true, /\.vue$/,'lazy')
export default {
    data(){
        return{
            pageRoutes:[]
        }
    },
    mounted(){
        console.log(pages);
        pages.keys().forEach(async(r)=>{
            console.log(r);
            console.log(pages(r));
            let module=await pages(r)
            console.log(module.default.name);
            this.pageRoutes.push({
                name:module.default.name,
                path:r.split(".")[1]
            })
        })
    }
}
</script>

<style lang="less" scoped>

</style>