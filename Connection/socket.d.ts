/// <reference types="node" />
import WebSocket from "ws";
import { SocketConfig, SuperChatsEventEmitter, AuthenticationCreds } from "../Models";
import { BinaryNode } from '../Internal';
/**
 * Connects to WA servers and performs:
 * - simple queries (no retry mechanism, wait for connection establishment)
 * - listen to messages and emit events
 * - query phone connection
 */
export declare const makeSocket: ({ waWebSocketUrl, connectTimeoutMs, logger, agent, keepAliveIntervalMs, version, browser, auth: initialAuthState, printQRInTerminal, defaultQueryTimeoutMs }: SocketConfig) => {
    type: "md";
    ws: WebSocket;
    ev: SuperChatsEventEmitter;
    authState: {
        creds: AuthenticationCreds;
        keys: import("../Models").SignalKeyStoreWithTransaction;
    };
    readonly user: import("../Models").Contact;
    assertingPreKeys: (range: number, execute: (keys: {
        [_: number]: any;
    }) => Promise<void>) => Promise<void>;
    generateMessageTag: () => string;
    query: (node: BinaryNode, timeoutMs?: number) => Promise<BinaryNode>;
    waitForMessage: (msgId: string, timeoutMs?: number) => Promise<any>;
    waitForSocketOpen: () => Promise<void>;
    sendRawMessage: (data: Buffer | Uint8Array) => Promise<void>;
    sendNode: (node: BinaryNode) => Promise<void>;
    logout: () => Promise<void>;
    end: (error: Error | undefined) => void;
    logs_e: (message: string) => void;
    logs_i: (message: string) => void;
    /** Waits for the connection to WA to reach a state */
    waitForConnectionUpdate: (check: (u: Partial<import("../Models").ConnectionState>) => boolean, timeoutMs?: number) => Promise<void>;
};
export declare type Socket = ReturnType<typeof makeSocket>;
