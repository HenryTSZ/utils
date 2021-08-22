<template>
  <div class="sensitive-words">
    <el-form :model="form" label-position="top" label-width="auto">
      <el-form-item label="需要处理的敏感词, 敏感词之间使用逗号、空格或回车分割">
        <el-input
          v-model="form.sensitive"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入需要处理的敏感词"
          @change="saveSensitive"
        ></el-input>
      </el-form-item>
      <el-form-item label="敏感词是否区分大小写">
        <el-switch v-model="form.case" active-text="区分" inactive-text="不区分"></el-switch>
      </el-form-item>
      <el-form-item label="需要处理的文字">
        <el-input
          v-model="form.text"
          type="textarea"
          :autosize="{ minRows: 6 }"
          autofocus
          placeholder="请输入需要处理的文字"
        ></el-input>
      </el-form-item>
      <el-form-item label="分隔符, 敏感词使用什么分割, 默认空格">
        <el-input v-model="form.separator" placeholder="请输入分隔符"></el-input>
      </el-form-item>
    </el-form>
    <el-button-group>
      <el-button @click="resetSensitive">还原敏感词</el-button>
      <el-button @click="clear">清空文字</el-button>
      <el-button
        class="btn"
        type="primary"
        :disabled="!form.sensitive || !form.text || !form.separator"
        @click="handleText"
        :data-clipboard-text="result"
      >
        处理文字
      </el-button>
    </el-button-group>
    <pre><!-- 这里加注释是为了解决 pre 前面多余的空格, 可以去了查看一下效果
      -->{{ result }}
    </pre>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
const SENSITIVE = '股票 基金 通货膨胀 投资 投机 理财 通胀 证监会 银监会 韭菜 收益'
export default {
  name: 'SensitiveWords',
  data() {
    return {
      form: {
        sensitive: localStorage.getItem('SensitiveWords') || SENSITIVE,
        case: true,
        text: '',
        separator: ' '
      },
      words: /股票|基金|通货膨胀|投资|投机|理财|通胀|证监会|银监会|韭菜|收益/g,
      result: ''
    }
  },
  computed: {
    sensitiveReg() {
      const sensitives = this.form.sensitive
        .split(/[,，\s]/)
        .filter(Boolean)
        .join('|')
      return new RegExp(sensitives, `g${this.form.case ? 'i' : ''}`)
    }
  },
  methods: {
    // 本地保存敏感词
    saveSensitive() {
      localStorage.setItem('SensitiveWords', this.form.sensitive)
      this.$message.success('本地保存成功')
    },
    // 还原敏感词
    resetSensitive() {
      this.form.sensitive = SENSITIVE
      localStorage.removeItem('SensitiveWords')
    },
    // 处理文字
    handleText() {
      const { text, separator } = this.form
      this.result = text.replace(this.sensitiveReg, s => {
        return s.split('').join(separator)
      })
    },
    // 清空文字
    clear() {
      this.form.text = ''
      this.result = ''
    }
  },
  mounted() {
    if (Clipboard.isSupported()) {
      const clipboard = new Clipboard('.btn')
      // 复制成功后执行的回调函数
      clipboard.on('success', () => {
        this.$message.success('已复制到剪切板')
      })
      // 复制失败后执行的回调函数
      clipboard.on('error', e => {
        this.$message.warning(e)
      })
    }
  }
}
</script>

<style lang="less">
.sensitive-words {
  padding: 20px;
  pre {
    padding: 10px;
  }
}
</style>
