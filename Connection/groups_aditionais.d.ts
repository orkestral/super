/// <reference types="ws" />
/// <reference types="node" />
import { SocketConfig } from "../Models";
export declare const makeGroupsAdittionalSocket: (config: SocketConfig) => {
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
    setGroupSettings: (id: string, option: listSettings, boolean: boolean) => Promise<{}>;
    revokeGroupLink: (id: string) => Promise<{}>;
};
export declare enum GroupSettingChange {
    messageSend = "announcement",
    noMessageSend = "not_announcement",
    settingsChange = "locked",
    noSettingsChange = "unlocked"
}
declare type listSettings = ('message' | 'settings');
export {};
