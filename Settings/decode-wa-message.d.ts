import { AuthenticationState } from '../Models';
import { BinaryNode } from '../Internal';
import { proto } from '../Proto';
export declare const decodeMessageStanza: (stanza: BinaryNode, auth: AuthenticationState) => Promise<proto.IWebMessageInfo>;
