# chinese-seek

查找项目中全角字符(如汉字)

支持 es6, jsx

## Usage

 cp config.sample.js config.js

 配置 `config.js`

```
 projectPath: '项目路径'
 ignore: ['忽略目录1', '忽略目录2', ...]
 scope: 匹配内容正则, 默认为所有全角字符 (/[^\x00-\xff]/g)
 babel: babel 配置参数
```
