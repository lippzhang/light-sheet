import { defineConfig } from 'father';
export default defineConfig({
  esm: {
    input: 'src', // 默认编译目录
    output: 'esm',
    platform: 'browser', // 默认构建为 Browser 环境的产物
    transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
  },
  // 以下为 cjs 配置项启用时的默认值，有自定义需求时才需配置
  // cjs: {
  //   input: 'src', // 默认编译目录
  //   output: 'cjs',
  //   platform: 'node', // 默认构建为 Node.js 环境的产物
  //   transformer: 'babel', // 默认使用 esbuild 以获得更快的构建速度
  // },
  umd: {
    name: 'Workbook',
    output: 'dist',
  },
});