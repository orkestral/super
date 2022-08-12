/// <reference types="node" />
/// <reference types="ws" />
import { BinaryNode } from "../Internal";
import { LegacySocketConfig, ParticipantAction, GroupMetadata } from "../Models";
declare const makeGroupsSocket: (config: LegacySocketConfig) => {
    groupMetadata: (jid: string, minimal: boolean) => Promise<GroupMetadata>;
    /**
     * Create a group
     * @param title like, the title of the group
     * @param participants people to include in the group
     */
    groupCreate: (title: string, participants: string[]) => Promise<GroupMetadata>;
    /**
     * Leave a group
     * @param jid the ID of the group
     */
    groupLeave: (id: string) => Promise<void>;
    /**
     * Update the subject of the group
     * @param {string} jid the ID of the group
     * @param {string} title the new title of the group
     */
    groupUpdateSubject: (id: string, title: string) => Promise<void>;
    /**
     * Update the group description
     * @param {string} jid the ID of the group
     * @param {string} title the new title of the group
     */
    groupUpdateDescription: (jid: string, description: string) => Promise<{
        status: number;
    }>;
    /**
     * Update participants in the group
     * @param jid the ID of the group
     * @param participants the people to add
     */
    groupParticipantsUpdate: (id: string, participants: string[], action: ParticipantAction) => Promise<string[]>;
    /** Query broadcast list info */
    getBroadcastListInfo: (jid: string) => Promise<GroupMetadata>;
    groupInviteCode: (jid: string) => Promise<string>;
    relayMessage: (message: import("../Proto").proto.IWebMessageInfo, { waitForAck }?: {
        waitForAck: boolean;
    }) => Promise<void>;
    generateUrlInfo: (text: string) => Promise<import("../Models").WAUrlInfo>;
    messageInfo: (jid: string, messageID: string) => Promise<import("../Models").MessageInfo>;
    downloadMediaMessage: (message: import("../Proto").proto.IWebMessageInfo, type?: "stream" | "buffer") => Promise<Buffer | import("stream").Readable>;
    updateMediaMessage: (message: import("../Proto").proto.IWebMessageInfo) => Promise<BinaryNode>;
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
    setQuery: (nodes: BinaryNode[], binaryTag?: import("../Models").WATag, tag?: string) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error) => void;
};
export default makeGroupsSocket;
