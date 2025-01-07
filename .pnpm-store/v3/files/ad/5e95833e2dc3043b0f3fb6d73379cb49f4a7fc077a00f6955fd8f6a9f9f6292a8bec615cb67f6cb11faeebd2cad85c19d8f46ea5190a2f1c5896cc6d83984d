"use strict";
const {
  __spreadValues,
  __export,
  __toCommonJS,
  __async,
  __await,
  __asyncGenerator,
  __forAwait
} = require('./esblib.cjs');


// src/core.ts
var core_exports = {};
__export(core_exports, {
  $: () => $,
  ProcessOutput: () => ProcessOutput,
  ProcessPromise: () => ProcessPromise,
  cd: () => cd,
  defaults: () => defaults,
  kill: () => kill,
  log: () => import_util2.log,
  resolveDefaults: () => resolveDefaults,
  syncProcessCwd: () => syncProcessCwd,
  useBash: () => useBash,
  usePowerShell: () => usePowerShell,
  usePwsh: () => usePwsh,
  within: () => within
});
module.exports = __toCommonJS(core_exports);
var import_node_child_process = require("child_process");
var import_node_async_hooks = require("async_hooks");
var import_node_util = require("util");
var import_node_os = require("os");
var import_node_events = require("events");

// src/error.ts
var EXIT_CODES = {
  2: "Misuse of shell builtins",
  126: "Invoked command cannot execute",
  127: "Command not found",
  128: "Invalid exit argument",
  129: "Hangup",
  130: "Interrupt",
  131: "Quit and dump core",
  132: "Illegal instruction",
  133: "Trace/breakpoint trap",
  134: "Process aborted",
  135: 'Bus error: "access to undefined portion of memory object"',
  136: 'Floating point exception: "erroneous arithmetic operation"',
  137: "Kill (terminate immediately)",
  138: "User-defined 1",
  139: "Segmentation violation",
  140: "User-defined 2",
  141: "Write to pipe with no one reading",
  142: "Signal raised by alarm",
  143: "Termination (request to terminate)",
  145: "Child process terminated, stopped (or continued*)",
  146: "Continue if stopped",
  147: "Stop executing temporarily",
  148: "Terminal stop signal",
  149: 'Background process attempting to read from tty ("in")',
  150: 'Background process attempting to write to tty ("out")',
  151: "Urgent data available on socket",
  152: "CPU time limit exceeded",
  153: "File size limit exceeded",
  154: 'Signal raised by timer counting virtual time: "virtual timer expired"',
  155: "Profiling timer expired",
  157: "Pollable event",
  159: "Bad syscall"
};
var ERRNO_CODES = {
  0: "Success",
  1: "Not super-user",
  2: "No such file or directory",
  3: "No such process",
  4: "Interrupted system call",
  5: "I/O error",
  6: "No such device or address",
  7: "Arg list too long",
  8: "Exec format error",
  9: "Bad file number",
  10: "No children",
  11: "No more processes",
  12: "Not enough core",
  13: "Permission denied",
  14: "Bad address",
  15: "Block device required",
  16: "Mount device busy",
  17: "File exists",
  18: "Cross-device link",
  19: "No such device",
  20: "Not a directory",
  21: "Is a directory",
  22: "Invalid argument",
  23: "Too many open files in system",
  24: "Too many open files",
  25: "Not a typewriter",
  26: "Text file busy",
  27: "File too large",
  28: "No space left on device",
  29: "Illegal seek",
  30: "Read only file system",
  31: "Too many links",
  32: "Broken pipe",
  33: "Math arg out of domain of func",
  34: "Math result not representable",
  35: "File locking deadlock error",
  36: "File or path name too long",
  37: "No record locks available",
  38: "Function not implemented",
  39: "Directory not empty",
  40: "Too many symbolic links",
  42: "No message of desired type",
  43: "Identifier removed",
  44: "Channel number out of range",
  45: "Level 2 not synchronized",
  46: "Level 3 halted",
  47: "Level 3 reset",
  48: "Link number out of range",
  49: "Protocol driver not attached",
  50: "No CSI structure available",
  51: "Level 2 halted",
  52: "Invalid exchange",
  53: "Invalid request descriptor",
  54: "Exchange full",
  55: "No anode",
  56: "Invalid request code",
  57: "Invalid slot",
  59: "Bad font file fmt",
  60: "Device not a stream",
  61: "No data (for no delay io)",
  62: "Timer expired",
  63: "Out of streams resources",
  64: "Machine is not on the network",
  65: "Package not installed",
  66: "The object is remote",
  67: "The link has been severed",
  68: "Advertise error",
  69: "Srmount error",
  70: "Communication error on send",
  71: "Protocol error",
  72: "Multihop attempted",
  73: "Cross mount point (not really error)",
  74: "Trying to read unreadable message",
  75: "Value too large for defined data type",
  76: "Given log. name not unique",
  77: "f.d. invalid for this operation",
  78: "Remote address changed",
  79: "Can   access a needed shared lib",
  80: "Accessing a corrupted shared lib",
  81: ".lib section in a.out corrupted",
  82: "Attempting to link in too many libs",
  83: "Attempting to exec a shared library",
  84: "Illegal byte sequence",
  86: "Streams pipe error",
  87: "Too many users",
  88: "Socket operation on non-socket",
  89: "Destination address required",
  90: "Message too long",
  91: "Protocol wrong type for socket",
  92: "Protocol not available",
  93: "Unknown protocol",
  94: "Socket type not supported",
  95: "Not supported",
  96: "Protocol family not supported",
  97: "Address family not supported by protocol family",
  98: "Address already in use",
  99: "Address not available",
  100: "Network interface is not configured",
  101: "Network is unreachable",
  102: "Connection reset by network",
  103: "Connection aborted",
  104: "Connection reset by peer",
  105: "No buffer space available",
  106: "Socket is already connected",
  107: "Socket is not connected",
  108: "Can't send after socket shutdown",
  109: "Too many references",
  110: "Connection timed out",
  111: "Connection refused",
  112: "Host is down",
  113: "Host is unreachable",
  114: "Socket already connected",
  115: "Connection already in progress",
  116: "Stale file handle",
  122: "Quota exceeded",
  123: "No medium (in tape drive)",
  125: "Operation canceled",
  130: "Previous owner died",
  131: "State not recoverable"
};
function getErrnoMessage(errno) {
  return ERRNO_CODES[-errno] || "Unknown error";
}
function getExitCodeInfo(exitCode) {
  return EXIT_CODES[exitCode];
}
var formatExitMessage = (code, signal, stderr, from) => {
  let message = `exit code: ${code}`;
  if (code != 0 || signal != null) {
    message = `${stderr || "\n"}    at ${from}`;
    message += `
    exit code: ${code}${getExitCodeInfo(code) ? " (" + getExitCodeInfo(code) + ")" : ""}`;
    if (signal != null) {
      message += `
    signal: ${signal}`;
    }
  }
  return message;
};
var formatErrorMessage = (err, from) => {
  return `${err.message}
    errno: ${err.errno} (${getErrnoMessage(err.errno)})
    code: ${err.code}
    at ${from}`;
};
function getCallerLocation(err = new Error("zx error")) {
  return getCallerLocationFromString(err.stack);
}
function getCallerLocationFromString(stackString = "unknown") {
  var _a;
  return ((_a = stackString.split(/^\s*(at\s)?/m).filter((s) => s == null ? void 0 : s.includes(":"))[2]) == null ? void 0 : _a.trim()) || stackString;
}

// src/core.ts
var import_vendor_core = require("./vendor-core.cjs");
var import_util = require("./util.cjs");
var import_util2 = require("./util.cjs");
var CWD = Symbol("processCwd");
var SYNC = Symbol("syncExec");
var EOL = Buffer.from(import_node_os.EOL);
var SIGTERM = "SIGTERM";
var ENV_PREFIX = "ZX_";
var storage = new import_node_async_hooks.AsyncLocalStorage();
function getStore() {
  return storage.getStore() || defaults;
}
function within(callback) {
  return storage.run(__spreadValues({}, getStore()), callback);
}
var defaults = resolveDefaults({
  [CWD]: process.cwd(),
  [SYNC]: false,
  verbose: false,
  env: process.env,
  sync: false,
  shell: true,
  stdio: "pipe",
  nothrow: false,
  quiet: false,
  prefix: "",
  postfix: "",
  detached: false,
  preferLocal: false,
  spawn: import_node_child_process.spawn,
  spawnSync: import_node_child_process.spawnSync,
  log: import_util.log,
  kill,
  killSignal: SIGTERM,
  timeoutSignal: SIGTERM
});
var $ = new Proxy(
  function(pieces, ...args) {
    const snapshot = getStore();
    if (!Array.isArray(pieces)) {
      return function(...args2) {
        const self = this;
        return within(
          () => Object.assign($, snapshot, pieces).apply(self, args2)
        );
      };
    }
    const from = getCallerLocation();
    if (pieces.some((p) => p == void 0))
      throw new Error(`Malformed command at ${from}`);
    checkShell();
    checkQuote();
    let resolve, reject;
    const process2 = new ProcessPromise((...args2) => [resolve, reject] = args2);
    const cmd = (0, import_vendor_core.buildCmd)(
      $.quote,
      pieces,
      args
    );
    const sync = snapshot[SYNC];
    process2._bind(
      cmd,
      from,
      resolve,
      (v) => {
        reject(v);
        if (sync) throw v;
      },
      snapshot
    );
    if (!process2.isHalted() || sync) process2.run();
    return sync ? process2.output : process2;
  },
  {
    set(_, key, value) {
      const target = key in Function.prototype ? _ : getStore();
      Reflect.set(target, key === "sync" ? SYNC : key, value);
      return true;
    },
    get(_, key) {
      if (key === "sync") return $({ sync: true });
      const target = key in Function.prototype ? _ : getStore();
      return Reflect.get(target, key);
    }
  }
);
var _ProcessPromise = class _ProcessPromise extends Promise {
  constructor() {
    super(...arguments);
    this._command = "";
    this._from = "";
    this._snapshot = getStore();
    this._resolved = false;
    this._piped = false;
    this._run = false;
    this._ee = new import_node_events.EventEmitter();
    this._stdin = new import_vendor_core.VoidStream();
    this._zurk = null;
    this._output = null;
    this._reject = import_util.noop;
    this._resolve = import_util.noop;
    // Stream-like API
    this.writable = true;
  }
  _bind(cmd, from, resolve, reject, options) {
    this._command = cmd;
    this._from = from;
    this._resolve = resolve;
    this._reject = reject;
    this._snapshot = __spreadValues({ ac: new AbortController() }, options);
  }
  run() {
    var _a, _b, _c, _d, _e;
    if (this._run) return this;
    this._halted = false;
    this._run = true;
    (_a = this._pipedFrom) == null ? void 0 : _a.run();
    const $2 = this._snapshot;
    const self = this;
    const input = (_c = (_b = $2.input) == null ? void 0 : _b.stdout) != null ? _c : $2.input;
    if ($2.timeout) this.timeout($2.timeout, $2.timeoutSignal);
    if ($2.preferLocal) {
      const dirs = $2.preferLocal === true ? [$2.cwd, $2[CWD]] : [$2.preferLocal].flat();
      $2.env = (0, import_util.preferLocalBin)($2.env, ...dirs);
    }
    $2.log({
      kind: "cmd",
      cmd: this._command,
      verbose: self.isVerbose()
    });
    this._zurk = (0, import_vendor_core.exec)({
      input,
      cmd: $2.prefix + self._command + $2.postfix,
      cwd: (_d = $2.cwd) != null ? _d : $2[CWD],
      ac: $2.ac,
      signal: $2.signal,
      shell: (0, import_util.isString)($2.shell) ? $2.shell : true,
      env: $2.env,
      spawn: $2.spawn,
      spawnSync: $2.spawnSync,
      store: $2.store,
      stdin: self._stdin,
      stdio: (_e = self._stdio) != null ? _e : $2.stdio,
      sync: $2[SYNC],
      detached: $2.detached,
      ee: self._ee,
      run: (cb) => cb(),
      on: {
        start: () => {
          self._timeout && self.timeout(self._timeout, self._timeoutSignal);
        },
        stdout: (data) => {
          if (self._piped) return;
          $2.log({ kind: "stdout", data, verbose: self.isVerbose() });
        },
        stderr: (data) => {
          $2.log({ kind: "stderr", data, verbose: !self.isQuiet() });
        },
        // prettier-ignore
        end: (data, c) => {
          self._resolved = true;
          const { error, status, signal, duration, ctx } = data;
          const { stdout, stderr, stdall } = ctx.store;
          const dto = __spreadValues({
            // Lazy getters
            code: () => status,
            signal: () => signal,
            duration: () => duration,
            stdout: (0, import_util.once)(() => stdout.join("")),
            stderr: (0, import_util.once)(() => stderr.join("")),
            stdall: (0, import_util.once)(() => stdall.join("")),
            message: (0, import_util.once)(() => ProcessOutput.getExitMessage(
              status,
              signal,
              dto.stderr(),
              self._from
            ))
          }, error && {
            code: () => null,
            signal: () => null,
            message: () => ProcessOutput.getErrorMessage(error, self._from)
          });
          if (stdout.length && !stdout[stdout.length - 1].toString().endsWith("\n")) c.on.stdout(EOL, c);
          if (stderr.length && !stderr[stderr.length - 1].toString().endsWith("\n")) c.on.stderr(EOL, c);
          const output = new ProcessOutput(dto);
          self._output = output;
          if (error || status !== 0 && !self.isNothrow()) {
            self._reject(output);
          } else {
            self._resolve(output);
          }
        }
      }
    });
    return this;
  }
  _pipe(source, dest, ...args) {
    if ((0, import_util.isStringLiteral)(dest, ...args))
      return this.pipe[source](
        $({
          halt: true,
          ac: this._snapshot.ac,
          signal: this._snapshot.signal
        })(dest, ...args)
      );
    this._piped = true;
    const ee = this._ee;
    const from = new import_vendor_core.VoidStream();
    const fill = () => {
      for (const chunk of this._zurk.store[source]) from.write(chunk);
      return true;
    };
    const fillEnd = () => this._resolved && fill() && from.end();
    if (!this._resolved) {
      const onData = (chunk) => from.write(chunk);
      ee.once(source, () => {
        fill();
        ee.on(source, onData);
      }).once("end", () => {
        ee.removeListener(source, onData);
        from.end();
      });
    }
    if ((0, import_util.isString)(dest)) dest = fs.createWriteStream(dest);
    if (dest instanceof _ProcessPromise) {
      dest._pipedFrom = this;
      if (dest.isHalted() && this.isHalted()) {
        ee.once("start", () => from.pipe(dest.run()._stdin));
      } else {
        this.catch((e) => dest.isNothrow() ? import_util.noop : dest._reject(e));
        from.pipe(dest.run()._stdin);
      }
      fillEnd();
      return dest;
    }
    from.once("end", () => dest.emit("end-piped-from")).pipe(dest);
    fillEnd();
    return promisifyStream(dest, this);
  }
  abort(reason) {
    var _a, _b;
    if (this.signal !== ((_a = this._snapshot.ac) == null ? void 0 : _a.signal))
      throw new Error("The signal is controlled by another process.");
    if (!this.child)
      throw new Error("Trying to abort a process without creating one.");
    (_b = this._zurk) == null ? void 0 : _b.ac.abort(reason);
  }
  kill(signal = $.killSignal) {
    if (!this.child)
      throw new Error("Trying to kill a process without creating one.");
    if (!this.child.pid) throw new Error("The process pid is undefined.");
    return $.kill(this.child.pid, signal);
  }
  /**
   *  @deprecated Use $({halt: true})`cmd` instead.
   */
  halt() {
    return this;
  }
  // Getters
  get pid() {
    var _a;
    return (_a = this.child) == null ? void 0 : _a.pid;
  }
  get cmd() {
    return this._command;
  }
  get child() {
    var _a;
    return (_a = this._zurk) == null ? void 0 : _a.child;
  }
  get stdin() {
    var _a;
    return (_a = this.child) == null ? void 0 : _a.stdin;
  }
  get stdout() {
    var _a;
    return (_a = this.child) == null ? void 0 : _a.stdout;
  }
  get stderr() {
    var _a;
    return (_a = this.child) == null ? void 0 : _a.stderr;
  }
  get exitCode() {
    return this.then(
      (p) => p.exitCode,
      (p) => p.exitCode
    );
  }
  get signal() {
    var _a;
    return this._snapshot.signal || ((_a = this._snapshot.ac) == null ? void 0 : _a.signal);
  }
  get output() {
    return this._output;
  }
  // Configurators
  stdio(stdin, stdout = "pipe", stderr = "pipe") {
    this._stdio = [stdin, stdout, stderr];
    return this;
  }
  nothrow() {
    this._nothrow = true;
    return this;
  }
  quiet(v = true) {
    this._quiet = v;
    return this;
  }
  verbose(v = true) {
    this._verbose = v;
    return this;
  }
  timeout(d, signal = $.timeoutSignal) {
    this._timeout = (0, import_util.parseDuration)(d);
    this._timeoutSignal = signal;
    if (this._timeoutId) clearTimeout(this._timeoutId);
    if (this._timeout) {
      this._timeoutId = setTimeout(
        () => this.kill(this._timeoutSignal),
        this._timeout
      );
      this.finally(() => clearTimeout(this._timeoutId)).catch(import_util.noop);
    }
    return this;
  }
  // Output formatters
  json() {
    return this.then((p) => p.json());
  }
  text(encoding) {
    return this.then((p) => p.text(encoding));
  }
  lines() {
    return this.then((p) => p.lines());
  }
  buffer() {
    return this.then((p) => p.buffer());
  }
  blob(type) {
    return this.then((p) => p.blob(type));
  }
  // Status checkers
  isHalted() {
    var _a, _b;
    return (_b = (_a = this._halted) != null ? _a : this._snapshot.halt) != null ? _b : false;
  }
  isQuiet() {
    var _a;
    return (_a = this._quiet) != null ? _a : this._snapshot.quiet;
  }
  isVerbose() {
    var _a;
    return ((_a = this._verbose) != null ? _a : this._snapshot.verbose) && !this.isQuiet();
  }
  isNothrow() {
    var _a;
    return (_a = this._nothrow) != null ? _a : this._snapshot.nothrow;
  }
  // Promise API
  then(onfulfilled, onrejected) {
    return super.then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return super.catch(onrejected);
  }
  // Async iterator API
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, null, function* () {
      let last;
      const getLines = (chunk) => {
        const lines = ((last || "") + chunk.toString()).split("\n");
        last = lines.pop();
        return lines;
      };
      for (const chunk of this._zurk.store.stdout) {
        const lines = getLines(chunk);
        for (const line of lines) yield line;
      }
      try {
        for (var iter = __forAwait(this.stdout[Symbol.asyncIterator] ? this.stdout : import_vendor_core.VoidStream.from(this.stdout)), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
          const chunk = temp.value;
          const lines = getLines(chunk);
          for (const line of lines) yield line;
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield new __await(temp.call(iter)));
        } finally {
          if (error)
            throw error[0];
        }
      }
      if (last) yield last;
      if ((yield new __await(this.exitCode)) !== 0) throw this._output;
    });
  }
  emit(event, ...args) {
    return this;
  }
  on(event, cb) {
    this._stdin.on(event, cb);
    return this;
  }
  once(event, cb) {
    this._stdin.once(event, cb);
    return this;
  }
  write(data, encoding, cb) {
    this._stdin.write(data, encoding, cb);
    return this;
  }
  end(chunk, cb) {
    this._stdin.end(chunk, cb);
    return this;
  }
  removeListener(event, cb) {
    this._stdin.removeListener(event, cb);
    return this;
  }
};
Object.defineProperty(_ProcessPromise.prototype, "pipe", { get() {
  const self = this;
  const pipeStdout = function(dest, ...args) {
    return self._pipe.call(self, "stdout", dest, ...args);
  };
  const pipeStderr = function(dest, ...args) {
    return self._pipe.call(self, "stderr", dest, ...args);
  };
  return Object.assign(pipeStdout, { stderr: pipeStderr, stdout: pipeStdout });
} });
var ProcessPromise = _ProcessPromise;
var ProcessOutput = class extends Error {
  constructor(code, signal = null, stdout = "", stderr = "", combined = "", message = "", duration = 0) {
    super(message);
    this._code = null;
    this._signal = signal;
    this._stdout = stdout;
    this._stderr = stderr;
    this._combined = combined;
    this._duration = duration;
    if (code !== null && typeof code === "object") {
      Object.defineProperties(this, {
        _code: { get: code.code },
        _signal: { get: code.signal },
        _duration: { get: code.duration },
        _stdout: { get: code.stdout },
        _stderr: { get: code.stderr },
        _combined: { get: code.stdall },
        message: { get: code.message }
      });
    } else {
      this._code = code;
    }
  }
  toString() {
    return this._combined;
  }
  json() {
    return JSON.parse(this._combined);
  }
  buffer() {
    return Buffer.from(this._combined);
  }
  blob(type = "text/plain") {
    if (!globalThis.Blob)
      throw new Error(
        "Blob is not supported in this environment. Provide a polyfill"
      );
    return new Blob([this.buffer()], { type });
  }
  text(encoding = "utf8") {
    return encoding === "utf8" ? this.toString() : this.buffer().toString(encoding);
  }
  lines() {
    return this.valueOf().split(/\r?\n/);
  }
  valueOf() {
    return this._combined.trim();
  }
  get stdout() {
    return this._stdout;
  }
  get stderr() {
    return this._stderr;
  }
  get exitCode() {
    return this._code;
  }
  get signal() {
    return this._signal;
  }
  get duration() {
    return this._duration;
  }
  [import_node_util.inspect.custom]() {
    let stringify = (s, c) => s.length === 0 ? "''" : c((0, import_node_util.inspect)(s));
    return `ProcessOutput {
  stdout: ${stringify(this.stdout, import_vendor_core.chalk.green)},
  stderr: ${stringify(this.stderr, import_vendor_core.chalk.red)},
  signal: ${(0, import_node_util.inspect)(this.signal)},
  exitCode: ${(this.exitCode === 0 ? import_vendor_core.chalk.green : import_vendor_core.chalk.red)(this.exitCode)}${getExitCodeInfo(this.exitCode) ? import_vendor_core.chalk.grey(" (" + getExitCodeInfo(this.exitCode) + ")") : ""},
  duration: ${this.duration}
}`;
  }
};
ProcessOutput.getExitMessage = formatExitMessage;
ProcessOutput.getErrorMessage = formatErrorMessage;
function usePowerShell() {
  $.shell = import_vendor_core.which.sync("powershell.exe");
  $.prefix = "";
  $.postfix = "; exit $LastExitCode";
  $.quote = import_util.quotePowerShell;
}
function usePwsh() {
  $.shell = import_vendor_core.which.sync("pwsh");
  $.prefix = "";
  $.postfix = "; exit $LastExitCode";
  $.quote = import_util.quotePowerShell;
}
function useBash() {
  $.shell = import_vendor_core.which.sync("bash");
  $.prefix = "set -euo pipefail;";
  $.postfix = "";
  $.quote = import_util.quote;
}
try {
  useBash();
} catch (err) {
}
function checkShell() {
  if (!$.shell)
    throw new Error(`No shell is available: https://\xEF.at/zx-no-shell`);
}
function checkQuote() {
  if (!$.quote)
    throw new Error("No quote function is defined: https://\xEF.at/no-quote-func");
}
var cwdSyncHook;
function syncProcessCwd(flag = true) {
  cwdSyncHook = cwdSyncHook || (0, import_node_async_hooks.createHook)({
    init: syncCwd,
    before: syncCwd,
    promiseResolve: syncCwd,
    after: syncCwd,
    destroy: syncCwd
  });
  if (flag) cwdSyncHook.enable();
  else cwdSyncHook.disable();
}
function syncCwd() {
  if ($[CWD] != process.cwd()) process.chdir($[CWD]);
}
function cd(dir) {
  if (dir instanceof ProcessOutput) {
    dir = dir.toString().trim();
  }
  $.log({ kind: "cd", dir, verbose: !$.quiet && $.verbose });
  process.chdir(dir);
  $[CWD] = process.cwd();
}
function kill(_0) {
  return __async(this, arguments, function* (pid, signal = $.killSignal) {
    const children = yield import_vendor_core.ps.tree({ pid, recursive: true });
    for (const p of children) {
      try {
        process.kill(+p.pid, signal);
      } catch (e) {
      }
    }
    try {
      process.kill(-pid, signal);
    } catch (e) {
      try {
        process.kill(+pid, signal);
      } catch (e2) {
      }
    }
  });
}
var promisifyStream = (stream, from) => (0, import_util.proxyOverride)(stream, {
  then(res = import_util.noop, rej = import_util.noop) {
    return new Promise(
      (_res, _rej) => stream.once("error", (e) => _rej(rej(e))).once(
        "finish",
        () => _res(res((0, import_util.proxyOverride)(stream, from._output)))
      ).once(
        "end-piped-from",
        () => _res(res((0, import_util.proxyOverride)(stream, from._output)))
      )
    );
  },
  run() {
    return from.run();
  },
  _pipedFrom: from,
  pipe(...args) {
    const piped = stream.pipe.apply(stream, args);
    return piped instanceof ProcessPromise ? piped : promisifyStream(piped, from);
  }
});
function resolveDefaults(defs, prefix = ENV_PREFIX, env = process.env) {
  const allowed = /* @__PURE__ */ new Set([
    "cwd",
    "preferLocal",
    "detached",
    "verbose",
    "quiet",
    "timeout",
    "timeoutSignal",
    "prefix",
    "postfix",
    "shell"
  ]);
  return Object.entries(env).reduce((m, [k, v]) => {
    if (v && k.startsWith(prefix)) {
      const _k = (0, import_util.toCamelCase)(k.slice(prefix.length));
      const _v = (0, import_util.parseBool)(v);
      if (allowed.has(_k)) m[_k] = _v;
    }
    return m;
  }, defs);
}
/* c8 ignore next 100 */
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $,
  ProcessOutput,
  ProcessPromise,
  cd,
  defaults,
  kill,
  log,
  resolveDefaults,
  syncProcessCwd,
  useBash,
  usePowerShell,
  usePwsh,
  within
});