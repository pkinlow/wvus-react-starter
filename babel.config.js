module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env",
    {
      "targets": {
        "ie": "11"
      },
      "useBuiltIns": "usage",
      "corejs": {
        "version": 3,
        "proposals": true
      }
    }],
    "@babel/preset-react"
  ];

  return {
    presets
  };
}