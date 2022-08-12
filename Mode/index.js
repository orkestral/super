"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_BUNDLE_TYPE = exports.MEDIA_KEYS = exports.MEDIA_PATH_MAP = exports.DEFAULT_LEGACY_CONNECTION_CONFIG = exports.DEFAULT_CONNECTION_CONFIG = exports.optionsDefault = exports.URL_REGEX = exports.NOISE_WA_HEADER = exports.NOISE_MODE = exports.WA_DEFAULT_EPHEMERAL = exports.PHONE_CONNECTION_CB = exports.DEF_TAG_PREFIX = exports.DEF_CALLBACK_PREFIX = exports.DEFAULT_ORIGIN = exports.UNAUTHORIZED_CODES = void 0;
const pino_1 = __importDefault(require("pino"));
const Settings_1 = require("../Settings");
exports.UNAUTHORIZED_CODES = [401, 403, 419];
exports.DEFAULT_ORIGIN = 'https://web.whatsapp.com';
exports.DEF_CALLBACK_PREFIX = 'CB:';
exports.DEF_TAG_PREFIX = 'TAG:';
exports.PHONE_CONNECTION_CB = 'CB:Pong';
exports.WA_DEFAULT_EPHEMERAL = 7 * 24 * 60 * 60;
exports.NOISE_MODE = 'Noise_XX_25519_AESGCM_SHA256\0\0\0\0';
exports.NOISE_WA_HEADER = new Uint8Array([87, 65, 5, 2]); // last is "DICT_VERSION"
/** from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url */
exports.URL_REGEX = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
exports.optionsDefault = {
    phoneState: false,
    phoneNumber: '',
    sessionName: '',
};
const BASE_CONNECTION_CONFIG = {
    version: [2, 2147, 16],
    browser: Settings_1.Browsers.superchats('Chrome'),
    waWebSocketUrl: 'wss://web.whatsapp.com/ws/chat',
    connectTimeoutMs: 20000,
    keepAliveIntervalMs: 25000,
    logger: pino_1.default({ prettyPrint: { levelFirst: true, ignore: 'pid,hostname', translateTime: false }, timestamp: () => `,"time":"${exports.optionsDefault.sessionName}"` }),
    printQRInTerminal: false,
    emitOwnEvents: true,
    defaultQueryTimeoutMs: 60000,
    customUploadHosts: [],
};
exports.DEFAULT_CONNECTION_CONFIG = {
    ...BASE_CONNECTION_CONFIG,
    waWebSocketUrl: 'wss://web.whatsapp.com/ws/chat',
    welcomeScreen: true,
    decryptUrl: '',
    license: '',
    getMessage: async () => undefined
};
exports.DEFAULT_LEGACY_CONNECTION_CONFIG = {
    ...BASE_CONNECTION_CONFIG,
    waWebSocketUrl: 'wss://web.whatsapp.com/ws',
    phoneResponseTimeMs: 20000,
    expectResponseTimeout: 60000,
};
exports.MEDIA_PATH_MAP = {
    image: '/mms/image',
    video: '/mms/video',
    document: '/mms/document',
    audio: '/mms/audio',
    sticker: '/mms/image',
    history: '',
    'md-app-state': ''
};
exports.MEDIA_KEYS = Object.keys(exports.MEDIA_PATH_MAP);
exports.KEY_BUNDLE_TYPE = '';
