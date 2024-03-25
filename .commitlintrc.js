module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      //type可填值
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'], //type为小写
    'type-empty': [2, 'never'], //type非空
    'subject-case': [2, 'always', 'lower-case'], //subject小写
    'subject-empty': [2, 'never'], //subject非空
    'subject-full-stop': [2, 'never'], //结尾不用句号
    'subject-max-length': [2, 'always', 50] //最大长度不超过50
  }
};