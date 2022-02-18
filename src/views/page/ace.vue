<template>
  <div class="ace-container">
    <ace
      v-model="value"
      @change="valchange"
      @focus="focus"
      @copy="copy"
      @paste="paste"
      @blur="blur"
    ></ace>
  </div>
</template>
 
<script>
import ace from "../../components/ace.vue";

// const Events = [
//   "blur",
//   "input",
//   "change",
//   "copy",
//   "focus",
//   "paste",
// ];
export default {
  name: "ace1",
  cname: "在线代码编辑器",
  components: {
    ace,
  },
  mounted() {
    
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    valchange(val) {
      console.log("valchange", val);
    },
    focus(val) {
      console.log("focus", val);
    },
    copy(val) {
      console.log("copy", val);
    },
    paste(val) {
      console.log("paste", val);
    },
    blur(val) {
      console.log("blur", val);
    }
  },
  watch: {
    value() {
      console.log("this.value", this.value);
    },
  },
};
</script>
 
<style lang='less' scoped>
.ace-container {
  position: relative;
  height: 100%;
  .ace-editor {
    height: 100%;
    min-height: 500px;
    .ace_print-margin {
      display: none;
    }
    .ace_scroller {
      overflow-x: auto;
    }
  }
  .setting-wrap {
    display: flex;
    margin-bottom: 15px;
    > .item {
      margin-right: 20px;
    }
  }
}
</style>
