class FileListPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
      // console.log(compilation.assets, '000')
      let len = Object.keys(compilation.assets).length;

      let content = `# ${len} files emitted by webpack\n\n`;

      for(let filename in compilation.assets) {
        content += `- ${filename}\n`;
        if (/\.html$/.test(filename)) {
          console.log(filename)

          let a = compilation.assets[filename].source;
          // console.log(a());
          compilation.assets[filename].source = () => {
            return a().replace('<head>', `<head>\n<!-- 2021 -->`)
          }
        }
      }

      compilation.assets[this.options.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        }
      }
      cb();
    })
  }
}

module.exports = FileListPlugin;
