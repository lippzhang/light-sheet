import { type RequestInfo, type RequestInit } from './vendor-core.js';
export { isStringLiteral } from './vendor-core.js';
export declare function tempdir(prefix?: string): string;
export declare function tempfile(name?: string, data?: string | Buffer): string;
export declare function noop(): void;
export declare function identity<T>(v: T): T;
export declare function randomId(): string;
export declare function isString(obj: any): obj is string;
export declare function preferLocalBin(env: NodeJS.ProcessEnv, ...dirs: (string | undefined)[]): {
    [x: string]: string | undefined;
    TZ?: string;
};
export declare function quote(arg: string): string;
export declare function quotePowerShell(arg: string): string;
export type Duration = number | `${number}m` | `${number}s` | `${number}ms`;
export declare function parseDuration(d: Duration): number;
export type LogEntry = {
    verbose?: boolean;
} & ({
    kind: 'cmd';
    cmd: string;
} | {
    kind: 'stdout' | 'stderr';
    data: Buffer;
} | {
    kind: 'cd';
    dir: string;
} | {
    kind: 'fetch';
    url: RequestInfo;
    init?: RequestInit;
} | {
    kind: 'retry';
    attempt: number;
    total: number;
    delay: number;
    exception: unknown;
    error?: string;
} | {
    kind: 'custom';
    data: any;
});
export declare function log(entry: LogEntry): void;
export declare function formatCmd(cmd?: string): string;
export declare const once: <T extends (...args: any[]) => any>(fn: T) => (...args: Parameters<T>) => ReturnType<T>;
export declare const proxyOverride: <T extends object>(origin: T, ...fallbacks: any) => T;
export declare const toCamelCase: (str: string) => string;
export declare const parseBool: (v: string) => boolean | string;
export declare const parseDotenv: (content: string) => NodeJS.ProcessEnv;
export declare const readEnvFromFile: (filepath: string, env?: NodeJS.ProcessEnv) => NodeJS.ProcessEnv;
