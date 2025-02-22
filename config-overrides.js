/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
module.exports = {
  // eslint-disable-next-line func-names
  webpack: function (config, env) {
    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf instanceof Array) {
        // eslint-disable-next-line prettier/prettier
        rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
      }
      return rule;
    });
    return config;
  },
}
