log4js-node-extend [![Build Status](https://secure.travis-ci.org/ww24/log4js-node-extend.png?branch=master)](http://travis-ci.org/ww24/log4js-node-extend) [![Dependency Status](https://gemnasium.com/ww24/log4js-node-extend.png)](https://gemnasium.com/ww24/log4js-node-extend)
==================

It add useful meta data of code (file-name, function-name line-number, column-number) for `log4js-node`.

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
const log4js = require("log4js");
const log4js_extend = require("log4js-extend");

log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});

const logger = log4js.getLogger("category");
logger.info("test");
```

Options
---------
### path
Use relative path from path directory.

default: `null`

### format
Simple log format.

default: `"at @name (@file:@line:@column)"`

#### Keywords will replace as below.
* @name : function name
* @file : file name
* @line : line number
* @column : column number
