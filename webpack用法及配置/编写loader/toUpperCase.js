const { getOptions } = require('loader-utils');

module.exports = function(source, options) {
  const res = source.toUpperCase();
  console.log(getOptions(this))
  const callback = this.async();
  setTimeout(() => {
    callback(null, res, options);
  })
  return;
  // return `module.exports = "${res}"`;
}
