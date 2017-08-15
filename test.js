const expect = require("chai").expect;
const log4js = require("log4js");
const log4js_extend = require("./log4js-extend");
const recording = require('./node_modules/log4js/lib/appenders/recording');
const path = require("path");
const vm = require("vm");

describe("Logging", () => {
  before(() => {
    log4js.configure({
      appenders: { vcr: { type: "recording" } },
      categories: { default: { appenders: ['vcr'], level: 'info' } }
    });

    log4js_extend(log4js, {
      path: null,
      format: "at @name (@file:@line:@column)"
    });
  });

  afterEach(() => {
    recording.erase();
  });

  it("No Scope", function () {
    const logger = log4js.getLogger();

    logger.info("test");

    const events = recording.replay();
    const result = events[0].data.join(" ");
    expect(result).to.equal("test at <anonymous> (" + __filename + ":28:12)");
  });

  it("In Scope", function () {
    const logger = log4js.getLogger();

    !function scope() {
      logger.info("test");
    }();

    const events = recording.replay();
    const result = events[0].data.join(" ");
    expect(result).to.equal("test at scope (" + __filename + ":39:14)");
  });

  it("In Object", function () {
    const logger = log4js.getLogger();

    !{
      method: function scope() {
        logger.info("test");
      }
    }.method();

    const events = recording.replay();
    const result = events[0].data.join(" ");
    expect(result).to.equal("test at method (" + __filename + ":52:16)");
  });

  it("Relative Path", function () {
    log4js_extend(log4js, {
      path: __dirname
    });
    const logger = log4js.getLogger();

    logger.info("test");

    const events = recording.replay();
    const result = events[0].data.join(" ");
    expect(result).to.equal("test at <anonymous> (" + path.relative(__dirname, __filename) + ":67:12)");
  });

  it("No Options", function () {
    log4js_extend(log4js);
    const logger = log4js.getLogger();

    logger.info("test");

    const events = recording.replay();
    const result = events[0].data.join(" ");
    expect(result).to.equal("test at <anonymous> (" + __filename + ":78:12)");
  });

  it("trace.file empty", function () {
    log4js_extend(log4js);
    var logger = log4js.getLogger();

    var ctx = vm.createContext({logger: logger});
    vm.runInContext("logger.info(\"test\")", ctx, "");

    const events = recording.replay();
    const result = events[0].data.join(" ");
    expect(result).to.equal("test at <anonymous> (:1:8)");
  });
});
