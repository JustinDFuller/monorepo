module.exports = {
   extends: 'airbnb',
   env: {
     browser: true,
     commonjs: true,
     es6: true,
   },
   rules: {
     "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  globals: {
    __DEV__: false,
  }
};
