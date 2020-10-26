/**
 * ESLint 代码规范效验工具的配置文件
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off' // 关闭这个声明变量却没使用的警告
    // 'semi': ['error', 'always']   // 设置需要加分号;    如何没有生效，可以将node_modules中的.cache文件删掉，因为有缓存
  }
}
