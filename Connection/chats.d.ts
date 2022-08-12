/// <reference types="ws" />
/// <reference types="node" />
import { SocketConfig, WAPresence, WAPatchCreate, WAMediaUpload, WAPatchName, AppStateChunk, ChatModification, Contact, WABusinessProfile } from "../Models";
import { BinaryNode } from "../Internal";
import { proto } from '../Proto';
export declare const makeChatsSocket: (config: SocketConfig) => {
    appPatch: (patchCreate: WAPatchCreate) => Promise<void>;
    sendPresenceUpdate: (type: WAPresence, toJid?: string) => Promise<void>;
    presenceSubscribe: (toJid: string) => Promise<void>;
    profilePictureUrl: (jid: string, type?: 'preview' | 'image', timeoutMs?: number) => Promise<string>;
    onWhatsApp: (...jids: string[]) => Promise<{
        exists: boolean;
        jid: string;
    }[]>;
    fetchBlocklist: () => Promise<string[]>;
    fetchStatus: (jid: string) => Promise<{
        status: string;
        setAt: Date;
    }>;
    updateProfilePicture: (jid: string, content: WAMediaUpload) => Promise<void>;
    updateBlockStatus: (jid: string, action: 'block' | 'unblock') => Promise<void>;
    getBusinessProfile: (jid: string) => Promise<WABusinessProfile | void>;
    resyncAppState: (collections: WAPatchName[]) => Promise<AppStateChunk>;
    chatModify: (mod: ChatModification, jid: string) => Promise<void>;
    resyncMainAppState: () => Promise<void>;
    assertSessions: (jids: string[], force: boolean) => Promise<boolean>;
    relayMessage: (jid: string, message: proto.IMessage, { messageId: msgId, participant, additionalAttributes, cachedGroupMetadata }: import("../Models").MessageRelayOptions) => Promise<string>;
    sendReceipt: (jid: string, participant: string, messageIds: string[], type: "read" | "read-self") => Promise<void>;
    sendReadReceipt: (jid: string, participant: string, messageIds: string[]) => Promise<void>;
    refreshMediaConn: (forceGet?: boolean) => Promise<import("../Models").MediaConnInfo>;
    waUploadToServer: import("../Models").WAMediaUploadFunction;
    fetchPrivacySettings: (force?: boolean) => Promise<{
        [_: string]: string;
    }>;
    sendMessage: (jid: string, content: import("../Models").AnyMessageContent, options?: import("../Models").MiscMessageGenerationOptions) => Promise<proto.WebMessageInfo>;
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
    user: Contact;
    assertingPreKeys: (range: number, execute: (keys: {
        [_: number]: any;
    }) => Promise<void>) => Promise<void>;
    generateMessageTag: () => string;
    query: (node: BinaryNode, timeoutMs?: number) => Promise<BinaryNode>;
    waitForMessage: (msgId: string, timeoutMs?: number) => Promise<any>;
    waitForSocketOpen: () => Promise<void>;
    sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>;
    sendNode: (node: BinaryNode) => Promise<void>;
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
