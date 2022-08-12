/// <reference types="node" />
/// <reference types="ws" />
import { LegacySocketConfig } from '../Models';
declare const makeLegacySocket: (config: Partial<LegacySocketConfig>) => {
    groupMetadata: (jid: string, minimal: boolean) => Promise<import("../Models").GroupMetadata>;
    groupCreate: (title: string, participants: string[]) => Promise<import("../Models").GroupMetadata>;
    groupLeave: (id: string) => Promise<void>;
    groupUpdateSubject: (id: string, title: string) => Promise<void>;
    groupUpdateDescription: (jid: string, description: string) => Promise<{
        status: number;
    }>;
    groupParticipantsUpdate: (id: string, participants: string[], action: import("../Models").ParticipantAction) => Promise<string[]>;
    getBroadcastListInfo: (jid: string) => Promise<import("../Models").GroupMetadata>;
    groupInviteCode: (jid: string) => Promise<string>;
    relayMessage: (message: import("../Proto").proto.IWebMessageInfo, { waitForAck }?: {
        waitForAck: boolean;
    }) => Promise<void>;
    generateUrlInfo: (text: string) => Promise<import("../Models").WAUrlInfo>;
    messageInfo: (jid: string, messageID: string) => Promise<import("../Models").MessageInfo>;
    downloadMediaMessage: (message: import("../Proto").proto.IWebMessageInfo, type?: "stream" | "buffer") => Promise<Buffer | import("stream").Readable>;
    updateMediaMessage: (message: import("../Proto").proto.IWebMessageInfo) => Promise<import("../Internal").BinaryNode>;
    fetchMessagesFromWA: (jid: string, count: number, cursor?: import("../Models").WAMessageCursor) => Promise<import("../Proto").proto.WebMessageInfo[]>;
    loadMessageFromWA: (jid: string, id: string) => Promise<import("../Proto").proto.IWebMessageInfo>;
    searchMessages: (txt: string, inJid: string, count: number, page: number) => Promise<{
        last: boolean;
        messages: import("../Proto").proto.WebMessageInfo[];
    }>;
    sendMessage: (jid: string, content: import("../Models").AnyMessageContent, options?: import("../Models").MiscMessageGenerationOptions & {
        waitForAck?: boolean;
    }) => Promise<import("../Proto").proto.WebMessageInfo>;
    sendChatsQuery: (epoch: number) => Promise<string>;
    profilePictureUrl: (jid: string, timeoutMs?: number) => Promise<string>;
    chatRead: (fromMessage: import("../Proto").proto.IMessageKey, count: number) => Promise<void>;
    chatModify: (modification: import("../Models").ChatModification, jid: string, chatInfo: Pick<import("../Models").Chat, "mute" | "pin">, timestampNow?: number) => Promise<void | {
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
    setQuery: (nodes: import("../Internal").BinaryNode[], binaryTag?: import("../Models").WATag, tag?: string) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error) => void;
};
export default makeLegacySocket;
