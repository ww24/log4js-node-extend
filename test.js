var expect = require("chai").expect,
    log4js = require("log4js"),
    log4js_extend = require("./log4js-extend"),
    path = require("path"),
    vm = require("vm");

log4js_extend(log4js, {
  path: null,
  format: "at @name (@file:@line:@column)"
});

describe("Logging", function () {
  var result = [];

  before(function () {
    log4js.configure({
      adapters: []
    });
    log4js.addAppender(function () {
      result = arguments[0].data.join(" ");
    });
  });

  it("No Scope", function () {
    var log = log4js.getLogger("category");

    log.info("test");
    expect(result).to.equal("test at <anonymous> (" + __filename + ":27:9)");
  });

  it("In Scope", function () {
    var log = log4js.getLogger("category");

    !function scope() {
      log.info("test");
    }();
    expect(result).to.equal("test at scope (" + __filename + ":35:11)");
  });

  it("In Object", function () {
    var log = log4js.getLogger("category");

    !{
      method: function scope() {
        log.info("test");
      }
    }.method();
    expect(result).to.equal("test at method (" + __filename + ":45:13)");
  });

  it("Relative Path", function () {
    log4js_extend(log4js, {
      path: __dirname
    });
    var log = log4js.getLogger("category");

    log.info("test");
    expect(result).to.equal("test at <anonymous> (" + path.relative(__dirname, __filename) + ":57:9)");
  });

  it("No Options", function () {
    log4js_extend(log4js);
    var log = log4js.getLogger("category");

    log.info("test");
    expect(result).to.equal("test at <anonymous> (" + __filename + ":65:9)");
  });

  it("trace.file empty", function () {
    log4js_extend(log4js);
    var log = log4js.getLogger("category");

    var ctx = vm.createContext({log: log});
    vm.runInContext("log.info(\"test\")", ctx, "");
    expect(result).to.equal("test at <anonymous> (:1:5)");
  });
});
