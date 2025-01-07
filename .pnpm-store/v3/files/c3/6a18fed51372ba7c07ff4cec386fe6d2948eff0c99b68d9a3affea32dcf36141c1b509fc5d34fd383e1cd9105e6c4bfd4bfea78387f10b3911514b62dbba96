import { type StdioOptions, type IOType, spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { type Encoding } from 'node:crypto';
import { type Readable, type Writable } from 'node:stream';
import { inspect } from 'node:util';
import { type TSpawnStore } from './vendor-core.js';
import { type Duration, log, quote } from './util.js';
export { log, type LogEntry } from './util.js';
declare const CWD: unique symbol;
declare const SYNC: unique symbol;
export declare function within<R>(callback: () => R): R;
export interface Options {
    [CWD]: string;
    [SYNC]: boolean;
    cwd?: string;
    ac?: AbortController;
    signal?: AbortSignal;
    input?: string | Buffer | Readable | ProcessOutput | ProcessPromise;
    timeout?: Duration;
    timeoutSignal?: NodeJS.Signals;
    stdio: StdioOptions;
    verbose: boolean;
    sync: boolean;
    env: NodeJS.ProcessEnv;
    shell: string | true;
    nothrow: boolean;
    prefix: string;
    postfix: string;
    quote?: typeof quote;
    quiet: boolean;
    detached: boolean;
    preferLocal: boolean | string | string[];
    spawn: typeof spawn;
    spawnSync: typeof spawnSync;
    store?: TSpawnStore;
    log: typeof log;
    kill: typeof kill;
    killSignal?: NodeJS.Signals;
    halt?: boolean;
}
export declare const defaults: Options;
export interface Shell<S = false, R = S extends true ? ProcessOutput : ProcessPromise> {
    (pieces: TemplateStringsArray, ...args: any[]): R;
    <O extends Partial<Options> = Partial<Options>, R = O extends {
        sync: true;
    } ? Shell<true> : Shell>(opts: O): R;
    sync: {
        (pieces: TemplateStringsArray, ...args: any[]): ProcessOutput;
        (opts: Partial<Omit<Options, 'sync'>>): Shell<true>;
    };
}
export declare const $: Shell & Options;
type Resolve = (out: ProcessOutput) => void;
type PipeMethod = {
    (dest: TemplateStringsArray, ...args: any[]): ProcessPromise;
    <D extends Writable>(dest: D): D & PromiseLike<ProcessOutput & D>;
    <D extends ProcessPromise>(dest: D): D;
};
export declare class ProcessPromise extends Promise<ProcessOutput> {
    private _command;
    private _from;
    private _snapshot;
    private _stdio?;
    private _nothrow?;
    private _quiet?;
    private _verbose?;
    private _timeout?;
    private _timeoutSignal?;
    private _timeoutId?;
    private _resolved;
    private _halted?;
    private _piped;
    private _pipedFrom?;
    private _run;
    private _ee;
    private _stdin;
    private _zurk;
    private _output;
    private _reject;
    private _resolve;
    _bind(cmd: string, from: string, resolve: Resolve, reject: Resolve, options: Options): void;
    run(): ProcessPromise;
    pipe: PipeMethod & {
        stdout: PipeMethod;
        stderr: PipeMethod;
    };
    private _pipe;
    abort(reason?: string): void;
    kill(signal?: NodeJS.Signals | undefined): Promise<void>;
    /**
     *  @deprecated Use $({halt: true})`cmd` instead.
     */
    halt(): this;
    get pid(): number | undefined;
    get cmd(): string;
    get child(): ChildProcess | undefined;
    get stdin(): Writable;
    get stdout(): Readable;
    get stderr(): Readable;
    get exitCode(): Promise<number | null>;
    get signal(): AbortSignal | undefined;
    get output(): ProcessOutput | null;
    stdio(stdin: IOType, stdout?: IOType, stderr?: IOType): ProcessPromise;
    nothrow(): ProcessPromise;
    quiet(v?: boolean): ProcessPromise;
    verbose(v?: boolean): ProcessPromise;
    timeout(d: Duration, signal?: NodeJS.Signals | undefined): ProcessPromise;
    json<T = any>(): Promise<T>;
    text(encoding?: Encoding): Promise<string>;
    lines(): Promise<string[]>;
    buffer(): Promise<Buffer>;
    blob(type?: string): Promise<Blob>;
    isHalted(): boolean;
    isQuiet(): boolean;
    isVerbose(): boolean;
    isNothrow(): boolean;
    then<R = ProcessOutput, E = ProcessOutput>(onfulfilled?: ((value: ProcessOutput) => PromiseLike<R> | R) | undefined | null, onrejected?: ((reason: ProcessOutput) => PromiseLike<E> | E) | undefined | null): Promise<R | E>;
    catch<T = ProcessOutput>(onrejected?: ((reason: ProcessOutput) => PromiseLike<T> | T) | undefined | null): Promise<ProcessOutput | T>;
    [Symbol.asyncIterator](): AsyncGenerator<string, void, unknown>;
    private writable;
    private emit;
    private on;
    private once;
    private write;
    private end;
    private removeListener;
}
type GettersRecord<T extends Record<any, any>> = {
    [K in keyof T]: () => T[K];
};
type ProcessOutputLazyDto = GettersRecord<{
    code: number | null;
    signal: NodeJS.Signals | null;
    stdout: string;
    stderr: string;
    stdall: string;
    message: string;
    duration: number;
}>;
export declare class ProcessOutput extends Error {
    private readonly _code;
    private readonly _signal;
    private readonly _stdout;
    private readonly _stderr;
    private readonly _combined;
    private readonly _duration;
    constructor(dto: ProcessOutputLazyDto);
    constructor(code: number | null, signal: NodeJS.Signals | null, stdout: string, stderr: string, combined: string, message: string, duration?: number);
    toString(): string;
    json<T = any>(): T;
    buffer(): Buffer;
    blob(type?: string): Blob;
    text(encoding?: Encoding): string;
    lines(): string[];
    valueOf(): string;
    get stdout(): string;
    get stderr(): string;
    get exitCode(): number | null;
    get signal(): NodeJS.Signals | null;
    get duration(): number;
    static getExitMessage: (code: number | null, signal: NodeJS.Signals | null, stderr: string, from: string) => string;
    static getErrorMessage: (err: NodeJS.ErrnoException, from: string) => string;
    [inspect.custom](): string;
}
export declare function usePowerShell(): void;
export declare function usePwsh(): void;
export declare function useBash(): void;
export declare function syncProcessCwd(flag?: boolean): void;
export declare function cd(dir: string | ProcessOutput): void;
export declare function kill(pid: number, signal?: NodeJS.Signals | undefined): Promise<void>;
export declare function resolveDefaults(defs: Options, prefix?: string, env?: NodeJS.ProcessEnv): Options;
