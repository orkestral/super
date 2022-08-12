import type { SocketConfig, AuthenticationCreds, SignalCreds } from "../Models";
import { BinaryNode } from '../Internal';
export declare const generateLoginNode: (userJid: string, config: Pick<SocketConfig, 'version' | 'browser'>) => Uint8Array;
export declare const generateRegistrationNode: ({ registrationId, signedPreKey, signedIdentityKey }: SignalCreds, config: Pick<SocketConfig, 'version' | 'browser'>) => Uint8Array;
export declare const configureSuccessfulPairing: (stanza: BinaryNode, { advSecretKey, signedIdentityKey, signalIdentities }: Pick<AuthenticationCreds, 'advSecretKey' | 'signedIdentityKey' | 'signalIdentities'>) => {
    creds: Partial<AuthenticationCreds>;
    reply: BinaryNode;
};
