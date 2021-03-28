const { getOptions } = require('loader-utils');

module.exports = function(source, options) {
  console.log("**", getOptions(this))
  // if (this.cacheable) this.cacheable(false);
  return `module.exports = "${source.replace(/[a-y]/ig, 'Z')}"`
}