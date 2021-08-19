<template>
  <div class="sensitive-words">
    <el-input
      v-model="text"
      type="textarea"
      autoresize
      autofocus
      placeholder="请输入需要处理的文字"
    ></el-input>
    <el-button-group>
      <el-button @click="clear">清空</el-button>
      <el-button
        class="btn"
        type="primary"
        :disabled="!text"
        @click="handleText"
        :data-clipboard-text="result"
        >处理</el-button
      >
    </el-button-group>
    <pre>
      <code>{{ result }}</code>
    </pre>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "SensitiveWords",
  components: {},
  props: {},
  data() {
    return {
      text: "",
      words: /股票|基金|通货膨胀|投资|投机|理财|通胀|证监会|银监会|韭菜|收益/g,
      result: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {},
    handleText() {
      this.result = this.text.replace(this.words, (s) => {
        return s.split("").join(" ");
      });
    },
    clear() {
      this.text = "";
      this.result = "";
    },
  },
  created() {
    this.init();
  },
  mounted() {
    if (Clipboard.isSupported()) {
      const clipboard = new Clipboard(".btn");
      // 复制成功后执行的回调函数
      clipboard.on("success", () => {
        this.$message.success("已复制到剪切板");
      });
      // 复制失败后执行的回调函数
      clipboard.on("error", (e) => {
        this.$message.warning(e);
      });
    }
  },
};
</script>

<style lang="less">
.sensitive-words {
}
</style>
