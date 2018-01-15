module.exports = {
   parser: 'babel-eslint',
   extends:[
     'airbnb',
   ],
   env: {
     node: true,
     es6: true,
     browser: true,
   },
   rules: {
     'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
     'linebreak-style': ["error", "windows"],
     'jsx-a11y/img-has-alt': 0,
     'react/jsx-filename-extension': 0,
   },
   fix: true,
};
