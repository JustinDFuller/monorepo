module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    env: {
        node: true,
        es6: true
    },
    "extends": "airbnb",
    "plugins": ["ava"],
    "extends": [
        "plugin:ava/recommended",
        "airbnb",
    ],
    rules: {
      "ava/no-ignored-test-files": ["error", {"files": ["**/*.spec.js"]}],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        // "import/no-extraneous-dependencies": 0,
        "max-len": ["error", 150],
    }
};
