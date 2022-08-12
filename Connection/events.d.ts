/// <reference types="ws" />
/// <reference types="node" />
import { SocketConfig } from "../Models";
export declare const makeEventsSocket: (config: SocketConfig) => {
    onMessage: (listener: (...args: any[]) => void) => import("../Models").SuperChatsEventEmitter;
    onAck: (listener: (...args: any[]) => void) => import("../Models").SuperChatsEventEmitter;
    onPresence: (listener: (...args: any[]) => void) => Promise<import("../Models").SuperChatsEventEmitter>;
    onDelete: (listener: (...args: any[]) => void) => Promise<import("../Models").SuperChatsEventEmitter>;
    onGroups: (listener: (...args: any[]) => void) => Promise<import("../Models").SuperChatsEventEmitter>;
    onParticipants: (listener: (...args: any[]) => void) => Promise<import("../Models").SuperChatsEventEmitter>;
    getAllContacts: () => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        qt: number;
        contacts: any[];
    }>;
    getBatteryLevel: () => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    getBlockList: () => Promise<{}>;
    getGroups: () => Promise<{}>;
    getChats: () => Promise<{}>;
    setPresence: (id: string, type: string) => Promise<{}>;
    setPicture: (id: string, file: string) => Promise<{}>;
    blockContact: (id: string) => Promise<{}>;
    unblockContact: (id: string) => Promise<{}>;
    archiveChat: (id: string, boolean: boolean) => Promise<{}>;
    getPicture: (id: string) => Promise<{}>;
    deleteChat: (id: string) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    deleteMessageAll: (id: string, messageId: string) => Promise<{}>;
    deleteMessageMe: (id: string, messageId: string) => Promise<{}>;
    markRead: (id: string, messageId: any) => Promise<{}>;
    muteChat: (id: string, timer: "hour" | "week" | "ever") => Promise<{}>;
    unmuteChat: (id: string) => Promise<{}>;
    pinChat: (id: string, boolean: boolean) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    getNumberProfile: (id: string) => Promise<{}>;
    getProfileStatus: (id: string) => Promise<{}>;
    getHostDevice: () => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    infoGroup: (id: string) => Promise<{}>;
    decryptFile: (message: any) => Promise<{}>;
    decryptByIdFile: (id: string, msgId: string) => Promise<{}>;
    decryptRemote: (id: string, msgId: string) => Promise<{}>;
    decryptFileSave: (message: any, filename: any) => Promise<{}>;
    decryptByIdFileSave: (id: string, msgId: string, filename: string) => Promise<{}>;
    getConnectionState: () => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        state: string;
    }>;
    getName: (id: string) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    getChatMessages: (id: string, number: number) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    getChatAllMessages: (id: string) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    getAllUnreadMessages: () => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    getMessageById: (id: string, idMsg: string) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    sendText: (id: string, text: string, replyIdMessage?: string) => Promise<{}>;
    sendImage: (id: string, file: string, text?: string, replyIdMessage?: string) => Promise<import("../Proto").proto.WebMessageInfo>;
    sendLink: (id: any, link: any, description: any, replyIdMessage: any) => Promise<{}>;
    sendVideo: (id: string, file: string, text?: string, replyIdMessage?: string) => Promise<{}>;
    sendDocument: (id: string, file: string, filename?: string, replyIdMessage?: string) => Promise<{}>;
    sendAudio: (id: string, file: string, replyIdMessage?: string) => Promise<{}>;
    sendVoice: (id: string, file: string, replyIdMessage?: string) => Promise<{}>;
    sendLocation: (id: string, latitude: number, logitude: number, title?: string, address?: string, replyIdMessage?: string) => Promise<{}>;
    sendContact: (id: string, name: string, contact: string, replyIdMessage?: string) => Promise<{}>;
    sendSticker: (id: string, file: string, replyIdMessage?: string) => Promise<{}>;
    sendList: (id: string, btnName: string, sections: [], description?: string, caption?: string, replyIdMessage?: string) => Promise<{
        session: string;
        device: string;
        status: number;
        type: string;
        message: string;
    }>;
    sendButtons: (id: string, title: string, buttons: any, description?: string, image?: string, replyIdMessage?: string) => Promise<{}>;
    processMessage: (message: import("../Proto").proto.IWebMessageInfo, chatUpdate: Partial<import("../Models").Chat>) => Promise<void>;
    sendMessageAck: ({ tag, attrs }: import("../Internal").BinaryNode, extraAttrs: {
        [key: string]: string;
    }) => Promise<void>;
    sendRetryRequest: (node: import("../Internal").BinaryNode) => Promise<void>;
    appPatch: (patchCreate: import("../Models").WAPatchCreate) => Promise<void>;
    sendPresenceUpdate: (type: import("../Models").WAPresence, toJid?: string) => Promise<void>;
    presenceSubscribe: (toJid: string) => Promise<void>;
    profilePictureUrl: (jid: string, type?: "image" | "preview", timeoutMs?: number) => Promise<string>;
    onWhatsApp: (...jids: string[]) => Promise<{
        exists: boolean;
        jid: string;
    }[]>;
    fetchBlocklist: () => Promise<string[]>;
    fetchStatus: (jid: string) => Promise<{
        status: string;
        setAt: Date;
    }>;
    updateProfilePicture: (jid: string, content: import("../Models").WAMediaUpload) => Promise<void>;
    updateBlockStatus: (jid: string, action: "block" | "unblock") => Promise<void>;
    getBusinessProfile: (jid: string) => Promise<void | import("../Models").WABusinessProfile>;
    resyncAppState: (collections: import("../Models").WAPatchName[]) => Promise<import("../Models").AppStateChunk>;
    chatModify: (mod: import("../Models").ChatModification, jid: string) => Promise<void>;
    resyncMainAppState: () => Promise<void>;
    assertSessions: (jids: string[], force: boolean) => Promise<boolean>;
    relayMessage: (jid: string, message: import("../Proto").proto.IMessage, { messageId: msgId, participant, additionalAttributes, cachedGroupMetadata }: import("../Models").MessageRelayOptions) => Promise<string>;
    sendReceipt: (jid: string, participant: string, messageIds: string[], type: "read" | "read-self") => Promise<void>;
    sendReadReceipt: (jid: string, participant: string, messageIds: string[]) => Promise<void>;
    refreshMediaConn: (forceGet?: boolean) => Promise<import("../Models").MediaConnInfo>;
    waUploadToServer: import("../Models").WAMediaUploadFunction;
    fetchPrivacySettings: (force?: boolean) => Promise<{
        [_: string]: string;
    }>;
    sendMessage: (jid: string, content: import("../Models").AnyMessageContent, options?: import("../Models").MiscMessageGenerationOptions) => Promise<import("../Proto").proto.WebMessageInfo>;
    groupMetadata: (jid: string) => Promise<import("../Models").GroupMetadata>;
    groupCreate: (subject: string, participants: string[]) => Promise<import("../Models").GroupMetadata>;
    groupLeave: (id: string) => Promise<void>;
    groupUpdateSubject: (jid: string, subject: string) => Promise<void>;
    groupParticipantsUpdate: (jid: string, participants: string[], action: import("../Models").ParticipantAction) => Promise<string[]>;
    groupUpdateDescription: (jid: string, description?: string) => Promise<void>;
    groupInviteCode: (jid: string) => Promise<string>;
    groupRevokeInvite: (jid: string) => Promise<string>;
    groupAcceptInvite: (code: string) => Promise<string>;
    groupToggleEphemeral: (jid: string, ephemeralExpiration: number) => Promise<void>;
    groupSettingUpdate: (jid: string, setting: "announcement" | "locked" | "not_announcement" | "unlocked") => Promise<void>;
    groupFetchAllParticipating: () => Promise<{
        [_: string]: import("../Models").GroupMetadata;
    }>;
    type: "md";
    ws: import("ws");
    ev: import("../Models").SuperChatsEventEmitter;
    authState: {
        creds: import("../Models").AuthenticationCreds;
        keys: import("../Models").SignalKeyStoreWithTransaction;
    };
    user: import("../Models").Contact;
    assertingPreKeys: (range: number, execute: (keys: {
        [_: number]: any;
    }) => Promise<void>) => Promise<void>;
    generateMessageTag: () => string;
    query: (node: import("../Internal").BinaryNode, timeoutMs?: number) => Promise<import("../Internal").BinaryNode>;
    waitForMessage: (msgId: string, timeoutMs?: number) => Promise<any>;
    waitForSocketOpen: () => Promise<void>;
    sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>;
    sendNode: (node: import("../Internal").BinaryNode) => Promise<void>;
    logout: () => Promise<void>;
    end: (error: Error) => void;
    logs_e: (message: string) => void;
    logs_i: (message: string) => void;
    waitForConnectionUpdate: (check: (u: Partial<import("../Models").ConnectionState>) => boolean, timeoutMs?: number) => Promise<void>;
    createGroup: (name: string, participants: any) => Promise<{}>;
    addParticipantsGroup: (id: string, participants: any) => Promise<{}>;
    removeParticipantsGroup: (id: string, participants: any) => Promise<{}>;
    addGroupAdmins: (id: string, participants: any) => Promise<{}>;
    removeGroupAdmins: (id: string, participants: any) => Promise<{}>;
    groupTitle: (id: string, title: string) => Promise<{}>;
    groupDescription: (id: string, description: string) => Promise<{}>;
    leaveGroup: (id: string) => Promise<{}>;
    getGroupLink: (id: string) => Promise<{}>;
    joinGroup: (code: string) => Promise<{}>;
    setGroupSettings: (id: string, option: "message" | "settings", boolean: boolean) => Promise<{}>;
    revokeGroupLink: (id: string) => Promise<{}>;
};
