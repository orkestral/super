/// <reference types="node" />
import { Logger } from 'pino';
import { ConnectionState } from '../Models';
import { proto } from '../Proto';
import { CommonSuperChatsEventEmitter } from '../Models';
export declare const BRAND: string;
export declare const Browsers: {
    ubuntu: (browser: any) => [string, string, string];
    macOS: (browser: any) => [string, string, string];
    superchats: (browser: any) => [string, string, string];
    /** The appropriate browser based on your OS & release */
    appropriate: (browser: any) => [string, string, string];
};
export declare const BufferJSON: {
    replacer: (k: any, value: any) => any;
    reviver: (_: any, value: any) => any;
};
export declare const writeRandomPadMax16: (e: any) => any;
export declare const unpadRandomMax16: (e: Uint8Array | Buffer) => Uint8Array;
export declare const encodeWAMessage: (message: proto.IMessage) => Buffer;
export declare const generateRegistrationId: () => number;
export declare const encodeInt: (e: number, t: number) => Uint8Array;
export declare const encodeBigEndian: (e: number, t?: number) => Uint8Array;
export declare const toNumber: (t: Long | number) => number;
export declare function shallowChanges<T>(old: T, current: T, { lookForDeletedKeys }: {
    lookForDeletedKeys: boolean;
}): Partial<T>;
/** unix timestamp of a date in seconds */
export declare const unixTimestampSeconds: (date?: Date) => number;
export declare type DebouncedTimeout = ReturnType<typeof debouncedTimeout>;
export declare const debouncedTimeout: (intervalMs?: number, task?: () => void) => {
    start: (newIntervalMs?: number, newTask?: () => void) => void;
    cancel: () => void;
    setTask: (newTask: () => void) => () => void;
    setInterval: (newInterval: number) => number;
};
export declare const delay: (ms: number) => Promise<void>;
export declare const delayCancellable: (ms: number) => {
    delay: Promise<void>;
    cancel: () => void;
};
export declare function promiseTimeout<T>(ms: number, promise: (resolve: (v?: T) => void, reject: (error: any) => void) => void): Promise<T>;
export declare const generateMessageID: () => string;
export declare const bindWaitForConnectionUpdate: (ev: CommonSuperChatsEventEmitter<any>) => (check: (u: Partial<ConnectionState>) => boolean, timeoutMs?: number) => Promise<void>;
export declare const printQRIfNecessaryListener: (ev: CommonSuperChatsEventEmitter<any>, logger: Logger) => void;
