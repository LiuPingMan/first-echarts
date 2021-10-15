module.exports = {
  devServer: {
    port: 8999,
    open: true,
  },
  // 基本路径
  // pulicPath: process.env.NOOD_ENV === 'production' ? '' : '/',
  // 构建时的输出目录
  // outputDir: 'dist',
  // 防止静态资源的目录
  // assetDir: 'static',
  // html的输出路径
  // indexPath: 'index.html',
  // 文件名哈希
  // filenameHashing: true,
  // 在保存时用'eslint-loader'检查
  lintOnSave: false,
}