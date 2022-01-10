<template>
  <div id="app">
    <div class="route-list">
        <router-link class="route-item" v-for="(item) in pageRoutes" :key="item.name" :to="{path:item.path}">{{item.name}}</router-link>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
const pages=require.context("./views/page", true, /\.vue$/,'lazy')
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.route-list{
  margin-bottom: 20px;
.route-item{
    margin:  15px 20px;
}
}
</style>
