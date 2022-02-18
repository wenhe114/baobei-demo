<template>
  <div class="ace-container">
    <div class="setting-wrap">
        <div class="item">
          <label class="title">语言：</label>
          <el-select
            class="value"
            v-model="modePath"
            @change="handleModelPathChange"
            size="mini"
            value-key="name"
          >
            <el-option
              v-for="mode in modeArray"
              :key="mode.name"
              :label="mode.name"
              :value="mode.path"
            >
            </el-option>
          </el-select>
        </div>

        <div class="item">
          <label class="title">换行：</label>
          <el-select
            class="value"
            v-model="wrap"
            @change="handleWrapChange"
            size="mini"
            value-key="name"
          >
            <el-option
              v-for="wrap in wrapArray"
              :key="wrap.name"
              :label="wrap.name"
              :value="wrap.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>  
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>
 
<script>
import ace from "ace-builds";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/scss";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/text";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

// const themeArray = [{
//   name: 'monokai',
//   path: 'ace/theme/monokai'
// }]
// 是否开启自动换行
const wrapArray = [
  {
    name: "开启",
    value: true,
  },
  {
    name: "关闭",
    value: false,
  },
];

// 编辑器语言类型
const modeArray = [
  {
    name: "JavaScript",
    path: "ace/mode/javascript",
  },
  {
    name: "HTML",
    path: "ace/mode/html",
  },
  {
    name: "CSS",
    path: "ace/mode/css",
  },
  {
    name: "SCSS",
    path: "ace/mode/scss",
  },
  {
    name: "Json",
    path: "ace/mode/json",
  },
  {
    name: "Java",
    path: "ace/mode/java",
  },
  {
    name: "Text",
    path: "ace/mode/text",
  },
];

// $emit方法传值
const Events = [
  'blur',
  'input',
  'change',
  'copy',
  'focus',
  'paste',
];
export default {
  props: {
    value: String,
  },
  mounted() {
    // 初始化
    this.aceEditor = ace.edit(this.$refs.ace, {
      //   maxLines: 100,
      //   minLines: 10,
      fontSize: 14,
      value: this.value ? this.value : "",
      theme: this.themePath,
      mode: this.modePath,
      wrap: this.wrap,
      tabSize: 4,
    });
    // 激活自动提示
    this.aceEditor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true,
    });
    this.aceEditor.on('change',()=>{
      const content = this.aceEditor.getValue();
      this.$emit("change",content)
    })
    Events.forEach(x => {
      if (!["change","input"].includes(x)) {
        this.aceEditor.on(x, (...args)=>{
        this.$emit(x,args)
      });
      }
    });
  },
  data() {
    return {
      aceEditor: null,
      toggle: false,
      wrap: true,
      themePath: "ace/theme/monokai",
      modePath: "ace/mode/javascript",
      modeArray: modeArray,
      wrapArray: wrapArray,
    };
  },
  methods: {
    toggleConfigPanel() {
      this.toggle = !this.toggle;
    },
    handleModelPathChange(modelPath) {
      this.aceEditor.getSession().setMode(modelPath);
    },
    handleWrapChange(wrap) {
      this.aceEditor.getSession().setUseWrapMode(wrap);
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
  .setting-wrap{
      display: flex;
      margin-bottom: 15px;
      >.item{
          margin-right: 20px;
      }
  }
}
</style>
