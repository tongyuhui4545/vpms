module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    //这里的规则就是上面定义的JS代码规则
    'vue/max-attributes-per-line': [
      //每个属性占据一行
      'error',
      {
        singleline: 1,
        multiline: 1
      }
    ],
    'vue/multi-word-component-names': 0,
    'no-new-object': 'error',
    'object-shorthand': 'error', 
    'no-prototype-builtins': 'error', 
    'no-array-constructor': 'error', 
    'prefer-destructuring': 'error', 
    quotes: ['error', 'single'], 
    'prefer-template': 'error', 
    'template-curly-spacing': ['error', 'never'], 
    'no-eval': 'error',
    'no-useless-escape': 'error',
    'no-new-func': 'error', 
    'func-style': ['error', 'expression'], 
    'no-loop-func': 'error',
    'no-param-reassign': 'error', 
    'prefer-spread': 'error', 
    'prefer-arrow-callback': 'error', 
    'arrow-spacing': 'error', 
    'arrow-parens': ['error', 'always'], 
    'arrow-body-style': ['error', 'always'], 
    'no-dupe-class-members': 'error', 
    'no-duplicate-imports': 'error', 
    'no-iterator': 'error', 
    'no-undef': 'error', 
    'no-var': 'error', 
    eqeqeq: 'error', 
    'no-cond-assign': 'error', 
    'no-console': 'error', 
    'no-dupe-args': 'error', 
    'no-dupe-keys': 'error', 
    'no-duplicate-case': 'error', 
    'no-empty': 'error', 
    'no-extra-semi': 'error', 
    curly: 'error', 
    'default-case': 'error', 
    'no-empty-function': 'error', 
    'no-multi-spaces': 'error', 
    'no-new-wrappers': 'error', 
    'no-unused-expressions': 'error', 
    'comma-dangle': ['error', 'never'], 
    'line-comment-position': ['error', { position: 'above' }], 
    'lines-around-comment': 'error', 
    'no-mixed-spaces-and-tabs': 'error', 
    'space-infix-ops': 'error', 
    'no-debugger': 'error'
  }
};
