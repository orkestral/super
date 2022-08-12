/// <reference types="node" />
/// <reference types="ws" />
import { BinaryNode } from "../Internal";
import { Chat, WAMessageCursor, WAMessage, LegacySocketConfig, AnyMessageContent, MiscMessageGenerationOptions, WAUrlInfo, MessageInfo } from "../Models";
import { proto } from "../Proto";
declare const makeMessagesSocket: (config: LegacySocketConfig) => {
    relayMessage: (message: WAMessage, { waitForAck }?: {
        waitForAck: boolean;
    }) => Promise<void>;
    generateUrlInfo: (text: string) => Promise<WAUrlInfo>;
    messageInfo: (jid: string, messageID: string) => Promise<MessageInfo>;
    downloadMediaMessage: (message: WAMessage, type?: 'buffer' | 'stream') => Promise<Buffer | import("stream").Readable>;
    updateMediaMessage: (message: WAMessage) => Promise<BinaryNode>;
    fetchMessagesFromWA: (jid: string, count: number, cursor?: WAMessageCursor) => Promise<proto.WebMessageInfo[]>;
    /** Load a single message specified by the ID */
    loadMessageFromWA: (jid: string, id: string) => Promise<proto.IWebMessageInfo>;
    searchMessages: (txt: string, inJid: string | null, count: number, page: number) => Promise<{
        last: boolean;
        messages: proto.WebMessageInfo[];
    }>;
    sendMessage: (jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions & {
        waitForAck?: boolean;
    }) => Promise<proto.WebMessageInfo>;
    sendChatsQuery: (epoch: number) => Promise<string>;
    profilePictureUrl: (jid: string, timeoutMs?: number) => Promise<string>;
    chatRead: (fromMessage: proto.IMessageKey, count: number) => Promise<void>;
    chatModify: (modification: import("../Models").ChatModification, jid: string, chatInfo: Pick<Chat, "mute" | "pin">, timestampNow?: number) => Promise<void | {
        status: number;
    }>;
    onWhatsApp: (str: string) => Promise<{
        exists: boolean;
        jid: string;
        isBusiness: boolean;
    }>;
    sendPresenceUpdate: (type: import("../Models").WAPresence, jid: string) => Promise<string>;
    presenceSubscribe: (jid: string) => Promise<string>;
    getStatus: (jid: string) => Promise<{
        status: string;
    }>;
    setStatus: (status: string) => Promise<{
        status: number;
    }>;
    updateBusinessProfile: (profile: import("../Models").WABusinessProfile) => Promise<void>;
    updateProfileName: (name: string) => Promise<{
        status: number;
        pushname: string;
    }>;
    updateProfilePicture(jid: string, img: Buffer): Promise<void>;
    blockUser: (jid: string, type?: "add" | "remove") => Promise<void>;
    getBusinessProfile: (jid: string) => Promise<import("../Models").WABusinessProfile>;
    state: import("../Models").ConnectionState;
    authInfo: import("../Models").LegacyAuthenticationCreds;
    ev: import("../Models").LegacySuperChatsEventEmitter;
    canLogin: () => boolean;
    logout: () => Promise<void>;
    waitForConnectionUpdate: (check: (u: Partial<import("../Models").ConnectionState>) => boolean, timeoutMs?: number) => Promise<void>;
    type: "legacy";
    ws: import("ws");
    sendAdminTest: () => Promise<string>;
    updateKeys: (info: {
        encKey: Buffer;
        macKey: Buffer;
    }) => {
        encKey: Buffer;
        macKey: Buffer;
    };
    waitForSocketOpen: () => Promise<void>;
    sendNode: ({ json, binaryTag, tag, longTag }: import("../Models").SocketSendMessageOptions) => Promise<string>;
    generateMessageTag: (longTag?: boolean) => string;
    waitForMessage: (tag: string, requiresPhoneConnection: boolean, timeoutMs?: number) => {
        promise: Promise<any>;
        cancelToken: () => void;
    };
    query: ({ json, timeoutMs, expect200, tag, longTag, binaryTag, requiresPhoneConnection }: import("../Models").SocketQueryOptions) => Promise<any>;
    setQuery: (nodes: BinaryNode[], binaryTag?: import("../Models").WATag, tag?: string) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error) => void;
};
export default makeMessagesSocket;
