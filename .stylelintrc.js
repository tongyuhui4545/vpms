module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  rules: {
    //这里的规则就是上面定义的CSS代码规则
    indentation: 2, //设置缩进为2
    'declaration-block-trailing-semicolon': 'always', //属性声明末尾加分号
    'declaration-colon-space-after': 'always', //声明块的冒号之后必须要有空格
    'declaration-colon-space-before': 'never', //声明块的冒号之前不能有空格
    'selector-list-comma-space-after': 'always', //选择器列表的逗号之后必须有一个空格
    'selector-list-comma-space-before': 'never', //选择器列表的逗号之前不能有空格
    'declaration-bang-space-before': 'always', //在声明的叹号之前必须有一个空格
    'declaration-bang-space-after': 'never', //声明的叹号之后不能有空白符
    'block-opening-brace-space-before': 'always', // { 之前必须有一个空格
    'comment-whitespace-inside': 'always', //要求在注释标记内侧必须有空白符
    'function-parentheses-space-inside': 'never', //在函数的括号内侧不能有空白符
    'at-rule-name-space-after': 'always', //@规则名之后必须有一个空格
    'color-hex-length': 'short', //颜色值简写
    'color-hex-case': 'lower', //颜色值小写
    'length-zero-no-unit': true, //禁止零长度的单位
    'number-leading-zero': 'never', //禁止小于 1 的小数有一个前导零
    'max-empty-lines': 1, //相邻空行数量最大为1
    'block-closing-brace-newline-after': 'always', //在块的闭大括号之后必须有换行符
    'declaration-empty-line-before': 'never', //禁止在声明之前的空行
    'block-closing-brace-empty-line-before': 'never', //禁止在块的闭大括号之前空行
    'at-rule-semicolon-newline-after': 'always', //@规则的分号之后必须有换行符
    'block-opening-brace-newline-after': 'always', //开括号 { 后必须始终有换行
    'comment-empty-line-before': 'always', //注释前必须始终有一个空行
    'function-name-case': 'lower', //函数名小写
    'unit-case': 'lower', //单位小写
    'value-keyword-case': 'lower', //属性值小写
    'property-case': 'lower', //属性小写
    'selector-pseudo-element-case': 'lower', //伪元素选择器小写
    'selector-type-case': 'lower', //类型选择器小写
    'at-rule-name-case': 'lower', //@规则名小写
    'media-feature-name-case': 'lower', //媒体查询小写
    'string-quotes': 'double', //字符串使用双引号
    'function-url-quotes': 'always', //URL加引号
    'declaration-block-semicolon-newline-after': 'always', //分号后面必须始终有换行
    'declaration-block-semicolon-space-before': 'never', //分号之前不能有空格
    'function-comma-space-before': 'never', //分号前不能有空格
    'media-feature-colon-space-before': 'never', //冒号前不能有空格
    'media-feature-parentheses-space-inside': 'never', //媒体特性的圆括号内不允许空格
    'media-feature-range-operator-space-after': 'always', //在操作符之后必须始终有一个空格
    'media-feature-range-operator-space-before': 'always', //在操作符之前必须始终有一个空格
    'media-query-list-comma-newline-after': 'always', //媒体查询中逗号后必须换行
    'media-query-list-comma-space-before': 'never' //媒体查询列表的逗号之前不需要空格
  },
  overrides: [
    // 若项目中存在less文件，添加以下配置
    {
      files: '**/*.less',
      customSyntax: 'postcss-less'
    }
  ]
}