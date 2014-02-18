log4js-node-extend [![Build Status](https://secure.travis-ci.org/ww24/log4js-node-extend.png?branch=master)](http://travis-ci.org/ww24/log4js-node-extend) [![Dependency Status](https://gemnasium.com/ww24/log4js-node-extend.png)](https://gemnasium.com/ww24/log4js-node-extend)
==================

`log4js-node` のログ出力にファイル名、関数名、行番号、列番号を付加します。

Example
---------
```
[2014-02-18 12:24:14.238] [INFO] category - test at <anonymous> (test.js:57:9)
```

Installation
---------
```
npm install log4js-extend
```

Usage
---------
```js
var log4js = require("log4js"),
    log4js_extend = require("log4js-extend");

log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});

var logger = log4js.getLogger("category");
logger.info("test");
```

Options
---------
### path
ログに出力するファイル名を指定したパスからの相対パスで表示します。

default: `null`

### format
ログに付加する書式を指定します。

default: `"at @name (@file:@line:@column)"`

#### 下記 4 つは出力時にそれぞれ置換されます。
* @name : 関数名
* @file : ファイル名
* @line : 行番号
* @column : 列番号

License
---------
Apache License, Version 2.0
