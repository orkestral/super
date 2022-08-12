"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEventsSocket = void 0;
const functions_1 = require("./functions");
const Mode_1 = require("../Mode");
const superdb_js_1 = __importDefault(require("superdb.js"));
const makeEventsSocket = (config) => {
    const { logger } = config;
    const sock = functions_1.makeFunctionsSocket(config);
    const { groupMetadata } = sock;
    const db = new superdb_js_1.default({
        dir: "./data",
        name: "messages",
        raw: false,
        filename: 'messages_' + Mode_1.optionsDefault.sessionName
    });
    const onMessage = (listener) => {
        return sock.ev.on('messages.upsert', async (response) => {
            //@ts-ignore
            if (!response.messages[0].status) {
                const message = response.messages[1] ? response.messages[1] : response.messages[0];
                let type = 'conversation';
                let obj = {};
                try {
                    if (message.key.remoteJid.split('@')[1] !== 'broadcast') {
                        db.create(message.key.id, message);
                        switch (Object.keys(message.message)[0]) {
                            case 'conversation':
                                type = 'text';
                                obj = {
                                    session: Mode_1.optionsDefault.sessionName,
                                    device: Mode_1.optionsDefault.phoneNumber,
                                    event: 'on-message',
                                    type: type,
                                    isMedia: false,
                                    pushName: message.pushName,
                                    id: message.key.id,
                                    from: message.key.remoteJid.split('@')[0],
                                    content: message.message.conversation,
                                    isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                    participant: message.key.remoteJid.split('@')[0].length > 14 ? message.key.participant.split('@')[0] : '',
                                    // @ts-ignore
                                    timestamp: message.messageTimestamp.low,
                                };
                                break;
                            case 'audioMessage':
                                if (!message.message.audioMessage.contextInfo) {
                                    type = !message.message.audioMessage.ptt ? 'audio' : 'voice';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        file: {
                                            url: message.message.audioMessage.url,
                                            mimetype: message.message.audioMessage.mimetype,
                                            fileSha256: message.message.audioMessage.fileSha256,
                                            fileLength: message.message.audioMessage.fileLength,
                                            seconds: message.message.audioMessage.seconds,
                                            mediaKey: message.message.audioMessage.mediaKey,
                                            fileEncSha256: message.message.audioMessage.fileEncSha256,
                                            directPath: message.message.audioMessage.directPath,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.audioMessage.contextInfo.stanzaId ? 'reply' : (!message.message.audioMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    let subtype = !message.message.audioMessage.ptt ? 'audio' : 'voice';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: subtype,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.audioMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.audioMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        file: {
                                            url: message.message.audioMessage.url,
                                            mimetype: message.message.audioMessage.mimetype,
                                            fileSha256: message.message.audioMessage.fileSha256,
                                            fileLength: message.message.audioMessage.fileLength,
                                            seconds: message.message.audioMessage.seconds,
                                            mediaKey: message.message.audioMessage.mediaKey,
                                            fileEncSha256: message.message.audioMessage.fileEncSha256,
                                            directPath: message.message.audioMessage.directPath,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'imageMessage':
                                if (!message.message.imageMessage.contextInfo) {
                                    type = 'image';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        id: message.key.id,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        file: {
                                            url: message.message.imageMessage.url,
                                            caption: !message.message.imageMessage.caption
                                                ? ''
                                                : message.message.imageMessage.caption,
                                            mimetype: message.message.imageMessage.mimetype,
                                            fileSha256: message.message.imageMessage.fileSha256,
                                            fileLength: message.message.imageMessage.fileLength,
                                            height: message.message.imageMessage.height,
                                            width: message.message.imageMessage.width,
                                            mediaKey: message.message.imageMessage.mediaKey,
                                            fileEncSha256: message.message.imageMessage.fileEncSha256,
                                            directPath: message.message.imageMessage.directPath,
                                            thumbnail: message.message.imageMessage.jpegThumbnail,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.imageMessage.contextInfo.stanzaId ? 'reply' : (!message.message.imageMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: 'image',
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.imageMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.imageMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        file: {
                                            url: message.message.imageMessage.url,
                                            caption: !message.message.imageMessage.caption
                                                ? ''
                                                : message.message.imageMessage.caption,
                                            mimetype: message.message.imageMessage.mimetype,
                                            fileSha256: message.message.imageMessage.fileSha256,
                                            fileLength: message.message.imageMessage.fileLength,
                                            height: message.message.imageMessage.height,
                                            width: message.message.imageMessage.width,
                                            mediaKey: message.message.imageMessage.mediaKey,
                                            fileEncSha256: message.message.imageMessage.fileEncSha256,
                                            directPath: message.message.imageMessage.directPath,
                                            thumbnail: message.message.imageMessage.jpegThumbnail,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'viewOnceMessage':
                                switch (Object.keys(message.message.viewOnceMessage.message)[0]) {
                                    case "imageMessage":
                                        type = 'image-temporary';
                                        obj = {
                                            session: Mode_1.optionsDefault.sessionName,
                                            device: Mode_1.optionsDefault.phoneNumber,
                                            event: 'on-message',
                                            type: type,
                                            id: message.key.id,
                                            isMedia: true,
                                            pushName: message.pushName,
                                            from: message.key.remoteJid.split('@')[0],
                                            isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                            file: {
                                                url: message.message.viewOnceMessage.message.imageMessage.url,
                                                caption: !message.message.viewOnceMessage.message.imageMessage.caption
                                                    ? ''
                                                    : message.message.viewOnceMessage.message.imageMessage.caption,
                                                mimetype: message.message.viewOnceMessage.message.imageMessage.mimetype,
                                                fileSha256: message.message.viewOnceMessage.message.imageMessage.fileSha256,
                                                fileLength: message.message.viewOnceMessage.message.imageMessage.fileLength,
                                                height: message.message.viewOnceMessage.message.imageMessage.height,
                                                width: message.message.viewOnceMessage.message.imageMessage.width,
                                                mediaKey: message.message.viewOnceMessage.message.imageMessage.mediaKey,
                                                fileEncSha256: message.message.viewOnceMessage.message.imageMessage.fileEncSha256,
                                                directPath: message.message.viewOnceMessage.message.imageMessage.directPath,
                                                thumbnail: message.message.viewOnceMessage.message.imageMessage.jpegThumbnail,
                                            },
                                            participant: message.key.remoteJid.split('@')[0].length > 14
                                                ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                                : '',
                                            // @ts-ignore
                                            timestamp: message.messageTimestamp.low,
                                        };
                                        break;
                                    case "videoMessage":
                                        type = 'video-temporary';
                                        obj = {
                                            session: Mode_1.optionsDefault.sessionName,
                                            device: Mode_1.optionsDefault.phoneNumber,
                                            event: 'on-message',
                                            type: type,
                                            isMedia: true,
                                            pushName: message.pushName,
                                            id: message.key.id,
                                            from: message.key.remoteJid.split('@')[0],
                                            isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                            file: {
                                                url: message.message.viewOnceMessage.message.videoMessage.url,
                                                caption: !message.message.viewOnceMessage.message.videoMessage.caption
                                                    ? ''
                                                    : message.message.viewOnceMessage.message.videoMessage.caption,
                                                mimetype: message.message.viewOnceMessage.message.videoMessage.mimetype,
                                                seconds: message.message.viewOnceMessage.message.videoMessage.seconds,
                                                fileSha256: message.message.viewOnceMessage.message.videoMessage.fileSha256,
                                                fileLength: message.message.viewOnceMessage.message.videoMessage.fileLength,
                                                mediaKey: message.message.viewOnceMessage.message.videoMessage.mediaKey,
                                                fileEncSha256: message.message.viewOnceMessage.message.videoMessage.fileEncSha256,
                                                directPath: message.message.viewOnceMessage.message.videoMessage.directPath,
                                            },
                                            participant: message.key.remoteJid.split('@')[0].length > 14
                                                ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                                : '',
                                            // @ts-ignore
                                            timestamp: message.messageTimestamp.low,
                                        };
                                        break;
                                }
                                break;
                            case 'contactMessage':
                                if (!message.message.contactMessage.contextInfo) {
                                    type = 'contact';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: false,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        display: message.message.contactMessage.displayName,
                                        vcard: message.message.contactMessage.vcard,
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.contactMessage.contextInfo.stanzaId ? 'reply' : (!message.message.contactMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: 'contact',
                                        isMedia: false,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        display: message.message.contactMessage.displayName,
                                        vcard: message.message.contactMessage.vcard,
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.contactMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.contactMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'locationMessage':
                                if (!message.message.locationMessage.contextInfo) {
                                    type = 'location';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: false,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        name: message.message.locationMessage.name,
                                        address: message.message.locationMessage.address,
                                        url: message.message.locationMessage.url,
                                        thumbnail: message.message.locationMessage.jpegThumbnail,
                                        latitude: message.message.locationMessage.degreesLatitude,
                                        longitude: message.message.locationMessage.degreesLongitude,
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.locationMessage.contextInfo.stanzaId ? 'reply' : (!message.message.locationMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: 'location',
                                        isMedia: false,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        name: message.message.locationMessage.name,
                                        address: message.message.locationMessage.address,
                                        url: message.message.locationMessage.url,
                                        thumbnail: message.message.locationMessage.jpegThumbnail,
                                        latitude: message.message.locationMessage.degreesLatitude,
                                        longitude: message.message.locationMessage.degreesLongitude,
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.locationMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.locationMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'stickerMessage':
                                if (!message.message.stickerMessage.contextInfo) {
                                    type = 'sticker';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        file: {
                                            url: message.message.stickerMessage.url,
                                            mimetype: message.message.stickerMessage.mimetype,
                                            fileSha256: message.message.stickerMessage.fileSha256,
                                            fileLength: message.message.stickerMessage.fileLength,
                                            mediaKey: message.message.stickerMessage.mediaKey,
                                            fileEncSha256: message.message.stickerMessage.fileEncSha256,
                                            directPath: message.message.stickerMessage.directPath,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.stickerMessage.contextInfo.stanzaId ? 'reply' : (!message.message.stickerMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: 'sticker',
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.stickerMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.stickerMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        file: {
                                            url: message.message.stickerMessage.url,
                                            mimetype: message.message.stickerMessage.mimetype,
                                            fileSha256: message.message.stickerMessage.fileSha256,
                                            fileLength: message.message.stickerMessage.fileLength,
                                            mediaKey: message.message.stickerMessage.mediaKey,
                                            fileEncSha256: message.message.stickerMessage.fileEncSha256,
                                            directPath: message.message.stickerMessage.directPath,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'videoMessage':
                                if (!message.message.videoMessage.contextInfo) {
                                    type = !message.message.videoMessage.gifPlayback ? 'video' : 'gif';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        file: {
                                            url: message.message.videoMessage.url,
                                            caption: !message.message.videoMessage.caption
                                                ? ''
                                                : message.message.videoMessage.caption,
                                            mimetype: message.message.videoMessage.mimetype,
                                            seconds: message.message.videoMessage.seconds,
                                            fileSha256: message.message.videoMessage.fileSha256,
                                            fileLength: message.message.videoMessage.fileLength,
                                            mediaKey: message.message.videoMessage.mediaKey,
                                            fileEncSha256: message.message.videoMessage.fileEncSha256,
                                            directPath: message.message.videoMessage.directPath,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.videoMessage.contextInfo.stanzaId ? 'reply' : (!message.message.videoMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    let subtype = !message.message.videoMessage.gifPlayback ? 'video' : 'gif';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: subtype,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.videoMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.videoMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        file: {
                                            url: message.message.videoMessage.url,
                                            caption: !message.message.videoMessage.caption
                                                ? ''
                                                : message.message.videoMessage.caption,
                                            mimetype: message.message.videoMessage.mimetype,
                                            seconds: message.message.videoMessage.seconds,
                                            fileSha256: message.message.videoMessage.fileSha256,
                                            fileLength: message.message.videoMessage.fileLength,
                                            mediaKey: message.message.videoMessage.mediaKey,
                                            fileEncSha256: message.message.videoMessage.fileEncSha256,
                                            directPath: message.message.videoMessage.directPath,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'documentMessage':
                                if (!message.message.documentMessage.contextInfo) {
                                    type = 'document';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        // @ts-ignore
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        // @ts-ignore
                                        title: message.message.documentMessage.title,
                                        // @ts-ignore
                                        file: {
                                            url: message.message.documentMessage.url,
                                            mimetype: message.message.documentMessage.mimetype,
                                            filename: message.message.documentMessage.fileName,
                                            fileSha256: message.message.documentMessage.fileSha256,
                                            fileLength: message.message.documentMessage.fileLength,
                                            mediaKey: message.message.documentMessage.mediaKey,
                                            fileEncSha256: message.message.documentMessage.fileEncSha256,
                                            directPath: message.message.documentMessage.directPath,
                                            thumbnail: message.message.documentMessage.jpegThumbnail,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = message.message.documentMessage.contextInfo.stanzaId ? 'reply' : (!message.message.documentMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: 'document',
                                        isMedia: true,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        // @ts-ignore
                                        title: message.message.documentMessage.title,
                                        filename: message.message.documentMessage.fileName,
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.documentMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.documentMessage.contextInfo.stanzaId,
                                            }
                                            : '',
                                        file: {
                                            url: message.message.documentMessage.url,
                                            mimetype: message.message.documentMessage.mimetype,
                                            filename: message.message.documentMessage.fileName,
                                            fileSha256: message.message.documentMessage.fileSha256,
                                            fileLength: message.message.documentMessage.fileLength,
                                            mediaKey: message.message.documentMessage.mediaKey,
                                            fileEncSha256: message.message.documentMessage.fileEncSha256,
                                            directPath: message.message.documentMessage.directPath,
                                            thumbnail: message.message.documentMessage.jpegThumbnail,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                            case 'listMessage':
                                type = 'list';
                                obj = {
                                    session: Mode_1.optionsDefault.sessionName,
                                    device: Mode_1.optionsDefault.phoneNumber,
                                    event: 'on-message',
                                    type: type,
                                    isMedia: false,
                                    pushName: message.pushName,
                                    id: message.key.id,
                                    from: message.key.remoteJid.split('@')[0],
                                    description: message.message.listMessage.description,
                                    btnName: message.message.listMessage.buttonText,
                                    sections: message.message.listMessage.sections,
                                    isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                    // @ts-ignore
                                    timestamp: message.messageTimestamp.low,
                                };
                                break;
                            case 'listResponseMessage':
                                type = 'list-response';
                                obj = {
                                    session: Mode_1.optionsDefault.sessionName,
                                    device: Mode_1.optionsDefault.phoneNumber,
                                    event: 'on-message',
                                    type: type,
                                    isMedia: false,
                                    pushName: message.pushName,
                                    id: message.key.id,
                                    from: message.key.remoteJid.split('@')[0],
                                    idMessageList: message.message.listResponseMessage.contextInfo.stanzaId,
                                    participant: message.key.remoteJid.split('@')[0].length > 14
                                        ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                        : '',
                                    title: message.message.listResponseMessage.title,
                                    selectedId: message.message.listResponseMessage.singleSelectReply.selectedRowId,
                                    isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                    // @ts-ignore
                                    timestamp: message.messageTimestamp.low,
                                };
                                break;
                            case 'buttonsMessage':
                                type = 'buttons-message';
                                obj = {
                                    session: Mode_1.optionsDefault.sessionName,
                                    device: Mode_1.optionsDefault.phoneNumber,
                                    event: 'on-message',
                                    type: type,
                                    isMedia: false,
                                    pushName: message.pushName,
                                    id: message.key.id,
                                    from: message.key.remoteJid.split('@')[0],
                                    title: message.message.buttonsMessage.contentText,
                                    description: message.message.buttonsMessage.footerText,
                                    buttons: message.message.buttonsMessage.buttons,
                                    isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                    // @ts-ignore
                                    timestamp: message.messageTimestamp.low,
                                };
                                break;
                            case 'buttonsResponseMessage':
                                type = 'buttons-response';
                                obj = {
                                    session: Mode_1.optionsDefault.sessionName,
                                    device: Mode_1.optionsDefault.phoneNumber,
                                    event: 'on-message',
                                    type: type,
                                    isMedia: false,
                                    pushName: message.pushName,
                                    id: message.key.id,
                                    from: message.key.remoteJid.split('@')[0],
                                    idMessageButtons: message.message.buttonsResponseMessage.contextInfo.stanzaId,
                                    participant: message.key.remoteJid.split('@')[0].length > 14
                                        ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                        : '',
                                    title: message.message.buttonsResponseMessage.selectedDisplayText,
                                    selectedId: message.message.buttonsResponseMessage.selectedButtonId,
                                    isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                    // @ts-ignore
                                    timestamp: message.messageTimestamp.low,
                                };
                                break;
                            case 'extendedTextMessage':
                                if (!message.message.extendedTextMessage.matchedText) {
                                    type = message.message.extendedTextMessage.contextInfo.stanzaId ? 'reply' : (!message.message.extendedTextMessage.contextInfo.expiration ? 'forwarding' : 'temporary');
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        subtype: 'text',
                                        isMedia: false,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        text: message.message.extendedTextMessage.text,
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        reply: message.message.extendedTextMessage.contextInfo.stanzaId
                                            ? {
                                                id: message.message.extendedTextMessage.contextInfo.stanzaId,
                                            }
                                            : null,
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : '',
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                else {
                                    type = 'link-preview';
                                    obj = {
                                        session: Mode_1.optionsDefault.sessionName,
                                        device: Mode_1.optionsDefault.phoneNumber,
                                        event: 'on-message',
                                        type: type,
                                        isMedia: false,
                                        pushName: message.pushName,
                                        id: message.key.id,
                                        from: message.key.remoteJid.split('@')[0],
                                        isgroup: message.key.remoteJid.split('@')[0].length > 14 ? true : false,
                                        body: {
                                            mimetype: 'image/jpeg',
                                            thumbnail: message.message.extendedTextMessage.jpegThumbnail,
                                            title: message.message.extendedTextMessage.title,
                                            text: message.message.extendedTextMessage.text,
                                            link: message.message.extendedTextMessage.matchedText,
                                            description: message.message.extendedTextMessage.description,
                                        },
                                        participant: message.key.remoteJid.split('@')[0].length > 14
                                            ? (message.key.participant.split('@')[0] ? message.key.participant.split('@')[0] : message.participant.split('@')[0])
                                            : null,
                                        // @ts-ignore
                                        timestamp: message.messageTimestamp.low,
                                    };
                                }
                                break;
                        }
                        listener(obj);
                    }
                }
                catch (error) {
                }
            }
            else {
                db.create(response.messages[0].key.id, response.messages[0]);
            }
        });
    };
    const onAck = (listener) => {
        return sock.ev.on('messages.update', async (response) => {
            var _a, _b;
            try {
                if (response[0].key.fromMe == true && !((_b = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.messageStubType)) {
                    let obj = {};
                    // @ts-ignore
                    let status = 'SEND';
                    // @ts-ignore
                    switch (response[0].update.status) {
                        case 5:
                            status = 'PLAYED';
                            break;
                        case 4:
                            status = 'READ';
                            break;
                        case 3:
                            status = 'RECEIVED';
                            break;
                        case 2:
                            status = 'SEND';
                            break;
                        case 0:
                            status = 'MOBILE';
                            break;
                        case 1:
                            status = 'MOBILE';
                            break;
                    }
                    obj = {
                        session: Mode_1.optionsDefault.sessionName,
                        device: Mode_1.optionsDefault.phoneNumber,
                        event: 'on-ack',
                        status: status,
                        id: response[0].key.id,
                        to: response[0].key.remoteJid.split('@')[0],
                        isgroup: response[0].key.remoteJid.split('@')[0].length > 14 ? true : false,
                    };
                    listener(obj);
                }
            }
            catch (error) {
                //
            }
        });
    };
    const onPresence = async (listener) => {
        return sock.ev.on('presence.update', (response) => {
            var _a;
            let obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                event: 'on-presence',
                from: response.id.split('@')[0],
                isGroup: response.id.split('@')[1] == 'g.us' ? true : false,
                participant: response.id.split('@')[1] == 'g.us' ? Object.keys(response.presences)[0].split('@')[0] : null,
                status: (_a = response.presences[Object.keys(response.presences)[0]]) === null || _a === void 0 ? void 0 : _a.lastKnownPresence,
            };
            listener(obj);
        });
    };
    const onDelete = async (listener) => {
        return sock.ev.on('messages.update', (response) => {
            var _a, _b;
            //@ts-ignore
            if ((_b = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.messageStubType) {
                let obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    event: 'message-delete',
                    from: response[0].update.key.remoteJid.split('@')[0],
                    //@ts-ignore
                    id: response[0].update.key.id,
                    fromMe: response[0].update.key.fromMe
                };
                listener(obj);
            }
        });
    };
    const onGroups = async (listener) => {
        return sock.ev.on('groups.update', async (response) => {
            // @ts-ignore
            let group = Object.keys(response[0]);
            let action = '';
            let obj = {};
            const metadata = await groupMetadata(response[0].id);
            switch (group[1]) {
                case "subject":
                    action = 'change-name';
                    obj = {
                        session: Mode_1.optionsDefault.sessionName,
                        device: Mode_1.optionsDefault.phoneNumber,
                        event: 'on-groups',
                        action: action,
                        changed: response[0].subject,
                        group: metadata.subject,
                        from: response[0].id.split('@')[0],
                        total_participants: metadata.participants.length,
                        participants: metadata.participants.map((el) => {
                            return { id: el.id.split("@")[0], admin: el.admin };
                        }),
                    };
                    listener(obj);
                    break;
                case "announce":
                    action = 'change-messages-admin';
                    obj = {
                        session: Mode_1.optionsDefault.sessionName,
                        device: Mode_1.optionsDefault.phoneNumber,
                        event: 'on-groups',
                        action: action,
                        changed: response[0].announce ? 'active' : 'disabled',
                        group: metadata.subject,
                        from: response[0].id.split('@')[0],
                        total_participants: metadata.participants.length,
                        participants: metadata.participants.map((el) => {
                            return { id: el.id.split("@")[0], admin: el.admin };
                        }),
                    };
                    listener(obj);
                    break;
                case "":
                    action = 'change-settings-admin';
                    obj = {
                        session: Mode_1.optionsDefault.sessionName,
                        device: Mode_1.optionsDefault.phoneNumber,
                        event: 'on-groups',
                        action: action,
                        changed: response[0].restrict ? 'active' : 'disabled',
                        group: metadata.subject,
                        from: response[0].id.split('@')[0],
                        total_participants: metadata.participants.length,
                        participants: metadata.participants.map((el) => {
                            return { id: el.id.split("@")[0], admin: el.admin };
                        }),
                    };
                    listener(obj);
                    break;
            }
        });
    };
    const onParticipants = async (listener) => {
        return sock.ev.on('group-participants.update', async (response) => {
            let obj = {};
            try {
                const metadata = await groupMetadata(response.id);
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    event: 'on-participants',
                    group: metadata.subject,
                    from: response.id.split('@')[0],
                    participant: response.participants[0].split('@')[0],
                    action: response.action,
                    participants: metadata.participants.length,
                };
            }
            catch (error) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    event: 'on-participants',
                    from: response.id.split('@')[0],
                    participant: response.participants[0].split('@')[0],
                    action: response.action,
                };
            }
            listener(obj);
        });
    };
    return {
        ...sock,
        onMessage,
        onAck,
        onPresence,
        onDelete,
        onGroups,
        onParticipants
    };
};
exports.makeEventsSocket = makeEventsSocket;
