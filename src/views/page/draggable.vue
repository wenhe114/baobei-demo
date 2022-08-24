<template>
  <div class="root">
    <transition-group tag="div" class="container">
        <div class="goods-box" v-for="(item, index) in ailseData[1]" :key="1+'_'+index" 
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)">
          {{ item.name }}
        </div>
        <div class="goods-box" key="1add">
          +
        </div>
        <div class="line-row" key="1row"></div>
        <div class="goods-box" v-for="(item, index) in ailseData[2]" :key="2+'_'+index" 
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)">
          {{ item.name }}
        </div>
        <div class="goods-box" key="2add">
          +
        </div>
        <div class="line-row" key="2row"></div>
        <div class="goods-box" v-for="(item, index) in ailseData[3]" :key="3+'_'+index"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)">
          {{ item.name }}
        </div>
        <div class="goods-box" key="3add">
          +
        </div>
        <div class="line-row" key="3row"></div>
        <div class="goods-box" v-for="(item, index) in ailseData[4]" :key="4+'_'+index" 
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)">
         {{ item.name }}
        </div>
        <div class="goods-box" key="4add">
          +
        </div>
        <div class="line-row" key="4row"></div>
    </transition-group>
  </div>
</template>
 
<script>
import {cloneDeep} from "lodash"
export default {
  name: "draggable",
  data() {
    return {
      items: [
        { key: 1, color: "#3883a0" },
        { key: 2, color: "#4883a0" },
        { key: 3, color: "#5883a0" },
        { key: 4, color: "#6883a0" },
        { key: 5, color: "#7883a0" },
        { key: 6, color: "#8883a0" },
        { key: 7, color: "#9883a0" },
      ],
      ending: null,
      dragging: null,
      ailseData: {
        1: [{
            name:"商品1",
            tiersCode:1,
            scalesCode:1,
            sort:1,
            id:1
        }, {
            name:"商品2",
            tiersCode:1,
            scalesCode:2,
            sort:2,
            id:2
        }, {
            name:"商品3",
            tiersCode:1,
            scalesCode:3,
            sort:3,
            id:3
        }, {name:"商品4",tiersCode:1,
            scalesCode:4,
            sort:4,
            id:4}],
        2: [{name:"商品5",tiersCode:2,
            scalesCode:1,
            id:5,
            sort:5}, {name:"商品6",tiersCode:2,
            scalesCode:2,
            id:6,
            sort:6}, {name:"商品7",tiersCode:2,
            id:7,
            scalesCode:3,
            sort:7}, {name:"商品8",tiersCode:2,
            id:8,
            scalesCode:4,
            sort:8}],
        3: [{name:"商品9",tiersCode:3,
        id:9,
            scalesCode:1,
            sort:9}, {name:"商品10",tiersCode:3,
            id:10,
            scalesCode:2,
            sort:10}, {name:"商品11",tiersCode:3,
            id:11,
            scalesCode:3,
            sort:11}, {name:"商品12",tiersCode:3,
            id:12,
            scalesCode:4,
            sort:12}],
        4: [{name:"商品13",tiersCode:4,
        id:13,
            scalesCode:1,
            sort:13}, {name:"商品14",tiersCode:4,
            id:14,
            scalesCode:2,
            sort:14}, {name:"商品15",tiersCode:4,
            id:15,
            scalesCode:3,
            sort:15}, {name:"商品16",tiersCode:4,
            id:16,
            scalesCode:4,
            sort:16}],
      },
    };
  },
  methods: {
    handleDragStart(e, item) {
        console.log("start",e,item)
      this.dragging = item;
    },
    handleDragEnd(e, item) {
        console.log("start",e,item)
      if (this.ending.id === this.dragging.id) {
        return;
      }
      console.log("startdatarow",this.dragging.tiersCode,"startclo",this.dragging.scalesCode);
      console.log("endingrow",this.ending.tiersCode,"endingclo",this.ending.scalesCode);
      debugger
      let startTemp= Object.assign(cloneDeep(this.ending),{name:this.dragging.name,
        sort:this.dragging.sort,
        id:this.dragging.id,
        })
      let endTemp= Object.assign(cloneDeep(this.dragging),{name:this.ending.name,
        sort:this.ending.sort,
        id:this.ending.id,
        })
        console.log("startTemp",startTemp);
        console.log("startTemp.scalesCode-1",startTemp.scalesCode-1);
        console.log("startTemp.tiersCode-1",startTemp.tiersCode-1);
        console.log("this.ailseData[startTemp.tiersCode-1]",this.ailseData[startTemp.tiersCode-1]);
        console.log("this.ailseData[endTemp.tiersCode-1]",this.ailseData[endTemp.tiersCode-1]);
        console.log("endTemp",endTemp);
        debugger
        this.ailseData[startTemp.tiersCode].splice(startTemp.scalesCode-1,1,cloneDeep(startTemp))
        this.ailseData[endTemp.tiersCode].splice(endTemp.scalesCode-1,1,cloneDeep(endTemp))
    console.log(this.ailseData);
    debugger
      this.$nextTick(() => {
        this.dragging = null;
        this.ending = null;
      });
    },
    handleDragOver(e) {
      // 首先把div变成可以放置的元素，即重写dragenter/dragover
      // 在dragenter中针对放置目标来设置
      e.dataTransfer.dropEffect = "move";
    },
    handleDragEnter(e, item) {
      // 为需要移动的元素设置dragstart事件
      e.dataTransfer.effectAllowed = "move";
      console.log("ending",item)
      this.ending = item;
    },
  },
};
</script>
 
<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 200px;
  height: 200px;
  margin: 10px;
  color: #fff;
  transition: all linear 0.3s;
}
.item0 {
  width: 400px;
}
.goods-box {
        width: 100px;
        height: 100px;
        background: #f0f2f5;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
     
      }
.line-row{
    width: 100%;
}
</style>