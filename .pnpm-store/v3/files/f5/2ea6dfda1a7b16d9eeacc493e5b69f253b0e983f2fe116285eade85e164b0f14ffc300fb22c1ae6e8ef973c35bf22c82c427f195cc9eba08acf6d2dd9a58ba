"use strict";
const {
  __spreadValues,
  __spreadProps,
  __export,
  __toESM,
  __toCommonJS
} = require('./esblib.cjs');


// src/util.ts
var util_exports = {};
__export(util_exports, {
  formatCmd: () => formatCmd,
  identity: () => identity,
  isString: () => isString,
  isStringLiteral: () => import_vendor_core2.isStringLiteral,
  log: () => log,
  noop: () => noop,
  once: () => once,
  parseBool: () => parseBool,
  parseDotenv: () => parseDotenv,
  parseDuration: () => parseDuration,
  preferLocalBin: () => preferLocalBin,
  proxyOverride: () => proxyOverride,
  quote: () => quote,
  quotePowerShell: () => quotePowerShell,
  randomId: () => randomId,
  readEnvFromFile: () => readEnvFromFile,
  tempdir: () => tempdir,
  tempfile: () => tempfile,
  toCamelCase: () => toCamelCase
});
module.exports = __toCommonJS(util_exports);
var import_node_os = __toESM(require("os"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_fs = __toESM(require("fs"), 1);
var import_vendor_core = require("./vendor-core.cjs");
var import_node_util = require("util");
var import_vendor_core2 = require("./vendor-core.cjs");
function tempdir(prefix = `zx-${randomId()}`) {
  const dirpath = import_node_path.default.join(import_node_os.default.tmpdir(), prefix);
  import_node_fs.default.mkdirSync(dirpath, { recursive: true });
  return dirpath;
}
function tempfile(name, data) {
  const filepath = name ? import_node_path.default.join(tempdir(), name) : import_node_path.default.join(import_node_os.default.tmpdir(), `zx-${randomId()}`);
  if (data === void 0) import_node_fs.default.closeSync(import_node_fs.default.openSync(filepath, "w"));
  else import_node_fs.default.writeFileSync(filepath, data);
  return filepath;
}
function noop() {
}
function identity(v) {
  return v;
}
function randomId() {
  return Math.random().toString(36).slice(2);
}
function isString(obj) {
  return typeof obj === "string";
}
function preferLocalBin(env, ...dirs) {
  const pathKey = process.platform === "win32" ? Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path" : "PATH";
  const pathValue = dirs.map(
    (c) => c && [
      import_node_path.default.resolve(c, "node_modules", ".bin"),
      import_node_path.default.resolve(c)
    ]
  ).flat().concat(env[pathKey]).filter(Boolean).join(import_node_path.default.delimiter);
  return __spreadProps(__spreadValues({}, env), {
    [pathKey]: pathValue
  });
}
function quote(arg) {
  if (/^[a-z0-9/_.\-@:=]+$/i.test(arg) || arg === "") {
    return arg;
  }
  return `$'` + arg.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0") + `'`;
}
function quotePowerShell(arg) {
  if (/^[a-z0-9/_.\-]+$/i.test(arg) || arg === "") {
    return arg;
  }
  return `'` + arg.replace(/'/g, "''") + `'`;
}
function parseDuration(d) {
  if (typeof d === "number") {
    if (isNaN(d) || d < 0) throw new Error(`Invalid duration: "${d}".`);
    return d;
  }
  if (/^\d+s$/.test(d)) return +d.slice(0, -1) * 1e3;
  if (/^\d+ms$/.test(d)) return +d.slice(0, -2);
  if (/^\d+m$/.test(d)) return +d.slice(0, -1) * 1e3 * 60;
  throw new Error(`Unknown duration: "${d}".`);
}
function log(entry) {
  if (!entry.verbose) return;
  const stream = process.stderr;
  switch (entry.kind) {
    case "cmd":
      stream.write(formatCmd(entry.cmd));
      break;
    case "stdout":
    case "stderr":
    case "custom":
      stream.write(entry.data);
      break;
    case "cd":
      stream.write("$ " + import_vendor_core.chalk.greenBright("cd") + ` ${entry.dir}
`);
      break;
    case "fetch":
      const init = entry.init ? " " + (0, import_node_util.inspect)(entry.init) : "";
      stream.write("$ " + import_vendor_core.chalk.greenBright("fetch") + ` ${entry.url}${init}
`);
      break;
    case "retry":
      stream.write(
        import_vendor_core.chalk.bgRed.white(" FAIL ") + ` Attempt: ${entry.attempt}${entry.total == Infinity ? "" : `/${entry.total}`}` + (entry.delay > 0 ? `; next in ${entry.delay}ms` : "") + "\n"
      );
  }
}
function formatCmd(cmd) {
  if (cmd == void 0) return import_vendor_core.chalk.grey("undefined");
  const chars = [...cmd];
  let out = "$ ";
  let buf = "";
  let ch;
  let state = root;
  let wordCount = 0;
  while (state) {
    ch = chars.shift() || "EOF";
    if (ch == "\n") {
      out += style(state, buf) + "\n> ";
      buf = "";
      continue;
    }
    const next = ch === "EOF" ? void 0 : state();
    if (next !== state) {
      out += style(state, buf);
      buf = "";
    }
    state = next === root ? next() : next;
    buf += ch;
  }
  function style(state2, s) {
    if (s === "") return "";
    if (RESERVED_WORDS.has(s)) {
      return import_vendor_core.chalk.cyanBright(s);
    }
    if (state2 == word && wordCount == 0) {
      wordCount++;
      return import_vendor_core.chalk.greenBright(s);
    }
    if (state2 == syntax) {
      wordCount = 0;
      return import_vendor_core.chalk.cyanBright(s);
    }
    if (state2 == dollar) return import_vendor_core.chalk.yellowBright(s);
    if (state2 == null ? void 0 : state2.name.startsWith("str")) return import_vendor_core.chalk.yellowBright(s);
    return s;
  }
  function isSyntax(ch2) {
    return "()[]{}<>;:+|&=".includes(ch2);
  }
  function root() {
    if (/\s/.test(ch)) return space;
    if (isSyntax(ch)) return syntax;
    if (ch === "$") return dollar;
    if (ch === '"') return strDouble;
    if (ch === "'") return strSingle;
    return word;
  }
  function space() {
    if (/\s/.test(ch)) return space;
    return root;
  }
  function word() {
    if (/[0-9a-z/_.]/i.test(ch)) return word;
    return root;
  }
  function syntax() {
    if (isSyntax(ch)) return syntax;
    return root;
  }
  function dollar() {
    if (ch === "'") return str;
    return root;
  }
  function str() {
    if (ch === "'") return strEnd;
    if (ch === "\\") return strBackslash;
    return str;
  }
  function strBackslash() {
    return strEscape;
  }
  function strEscape() {
    return str;
  }
  function strDouble() {
    if (ch === '"') return strEnd;
    return strDouble;
  }
  function strSingle() {
    if (ch === "'") return strEnd;
    return strSingle;
  }
  function strEnd() {
    return root;
  }
  return out + "\n";
}
var RESERVED_WORDS = /* @__PURE__ */ new Set([
  "if",
  "then",
  "else",
  "elif",
  "fi",
  "case",
  "esac",
  "for",
  "select",
  "while",
  "until",
  "do",
  "done",
  "in"
]);
var once = (fn) => {
  let called = false;
  let result;
  return (...args) => {
    if (called) return result;
    called = true;
    return result = fn(...args);
  };
};
var proxyOverride = (origin, ...fallbacks) => new Proxy(origin, {
  get(target, key) {
    var _a, _b;
    return (_b = (_a = fallbacks.find((f) => key in f)) == null ? void 0 : _a[key]) != null ? _b : Reflect.get(target, key);
  }
});
var toCamelCase = (str) => str.toLowerCase().replace(/([a-z])[_-]+([a-z])/g, (_, p1, p2) => {
  return p1 + p2.toUpperCase();
});
var parseBool = (v) => {
  var _a;
  return (_a = { true: true, false: false }[v]) != null ? _a : v;
};
var parseDotenv = (content) => content.split(/\r?\n/).reduce((r, line) => {
  if (line.startsWith("export ")) line = line.slice(7);
  const i = line.indexOf("=");
  const k = line.slice(0, i).trim();
  const v = line.slice(i + 1).trim();
  if (k && v) r[k] = v;
  return r;
}, {});
var readEnvFromFile = (filepath, env = process.env) => {
  const content = import_node_fs.default.readFileSync(import_node_path.default.resolve(filepath), "utf8");
  return __spreadValues(__spreadValues({}, env), parseDotenv(content));
};
/* c8 ignore next 100 */
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatCmd,
  identity,
  isString,
  isStringLiteral,
  log,
  noop,
  once,
  parseBool,
  parseDotenv,
  parseDuration,
  preferLocalBin,
  proxyOverride,
  quote,
  quotePowerShell,
  randomId,
  readEnvFromFile,
  tempdir,
  tempfile,
  toCamelCase
});