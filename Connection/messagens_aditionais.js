"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMessagesAdittionalSocket = void 0;
const messages_recv_1 = require("./messages-recv");
const Mode_1 = require("../Mode");
const fs = require("fs");
const mimetype = require("mime-types");
const process_1 = require("process");
const superdb_js_1 = __importDefault(require("superdb.js"));
const makeMessagesAdittionalSocket = (config) => {
    const { logger } = config;
    const sock = messages_recv_1.makeMessagesRecvSocket(config);
    const { sendMessage, onWhatsApp } = sock;
    const db = new superdb_js_1.default({
        dir: "./data",
        name: "messages",
        raw: false,
        filename: 'messages_' + Mode_1.optionsDefault.sessionName
    });
    const pushInfoFile = (file) => {
        file = file.replace('//g', '/');
        let data = file.substring(file.lastIndexOf('/') + 1);
        var ext = data.substring(data.lastIndexOf('.') + 1);
        return { fileName: data.split('.' + ext)[0] };
    };
    const sendText = async (id, text, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let obj = {};
        let type = 'text';
        const exists = await onWhatsApp(jid);
        //@ts-ignore
        jid = exists[0] ? exists[0].jid : jid;
        //@ts-ignore
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
        let objM = {};
        objM = replyIdMessage ? { quoted: quotedMessage } : {};
        let response = await sendMessage(jid, { text: text }, objM);
        let row = db.exists(response.key.id);
        if (!row) {
            db.create(response.key.id, response);
        }
        //@ts-ignore
        if (!response.message.extendedTextMessage.contextInfo) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                isMedia: false,
                //@ts-ignore
                id: response.key.id,
                //@ts-ignore
                to: response.key.remoteJid.split('@')[0],
                //@ts-ignore
                content: response.message.extendedTextMessage.text,
                //@ts-ignore
                isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                // @ts-ignore
                timestamp: response.messageTimestamp.low,
            };
        }
        else {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: 'reply',
                subtype: type,
                isMedia: false,
                //@ts-ignore
                id: response.key.id,
                //@ts-ignore
                to: response.key.remoteJid.split('@')[0],
                //@ts-ignore
                content: response.message.extendedTextMessage.text,
                //@ts-ignore
                isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                reply: {
                    //@ts-ignore
                    id: response.message.extendedTextMessage.contextInfo.stanzaId,
                },
                // @ts-ignore
                timestamp: response.messageTimestamp.low,
            };
        }
        return obj;
    };
    const sendImage = async (id, file, text, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let type = 'image';
        let obj = {};
        const exists = await onWhatsApp(jid);
        //@ts-ignore
        jid = exists[0] ? exists[0].jid : jid;
        console.log(String(jid));
        //@ts-ignore
        // if (id.length < 15 && exists[0] && !exists[0].exists) {
        //     return (obj = {
        //         session: optionsDefault.sessionName,
        //         device: optionsDefault.phoneNumber,
        //         status: 404,
        //         type: type,
        //         message: 'phone number not is whatsapp',
        //     })
        // }
        // let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined
        // let objM = {}
        // objM = replyIdMessage ? { quoted: quotedMessage[0]} : {}
        let response = await sendMessage(String(jid), {
            image: data,
            caption: text
        });
        //  let row = db.exists(response.key.id)
        //  if(!row){
        // db.create(response.key.id, response)
        // }
        // if (!response.message.imageMessage.contextInfo) {
        //     obj = {
        //         session: optionsDefault.sessionName,
        //         device: optionsDefault.phoneNumber,
        //         status: 200,
        //         type: type,
        //         isMedia: true,
        //         id: response.key.id,
        //         to: response.key.remoteJid.split('@')[0],
        //         isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
        //         file: {
        //             url: response.message.imageMessage.url,
        //             caption: !response.message.imageMessage.caption ? '' : response.message.imageMessage.caption,
        //             mimetype: response.message.imageMessage.mimetype,
        //             fileSha256: response.message.imageMessage.fileSha256,
        //             fileLength: response.message.imageMessage.fileLength,
        //             height: response.message.imageMessage.height,
        //             width: response.message.imageMessage.width,
        //             mediaKey: response.message.imageMessage.mediaKey,
        //             fileEncSha256: response.message.imageMessage.fileEncSha256,
        //             directPath: response.message.imageMessage.directPath,
        //             thumbnail: response.message.imageMessage.jpegThumbnail,
        //         },
        //         participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
        //         // @ts-ignore
        //         timestamp: response.messageTimestamp.low,
        //     }
        // } else {
        //     obj = {
        //         session: optionsDefault.sessionName,
        //         device: optionsDefault.phoneNumber,
        //         status: 200,
        //         type: 'reply',
        //         subtype: type,
        //         isMedia: true,
        //         id: response.key.id,
        //         to: response.key.remoteJid.split('@')[0],
        //         isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
        //         file: {
        //             url: response.message.imageMessage.url,
        //             caption: !response.message.imageMessage.caption ? '' : response.message.imageMessage.caption,
        //             mimetype: response.message.imageMessage.mimetype,
        //             fileSha256: response.message.imageMessage.fileSha256,
        //             fileLength: response.message.imageMessage.fileLength,
        //             height: response.message.imageMessage.height,
        //             width: response.message.imageMessage.width,
        //             mediaKey: response.message.imageMessage.mediaKey,
        //             fileEncSha256: response.message.imageMessage.fileEncSha256,
        //             directPath: response.message.imageMessage.directPath,
        //             thumbnail: response.message.imageMessage.jpegThumbnail,
        //         },
        //         participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
        //         reply: {
        //             id: response.message.imageMessage.contextInfo.stanzaId,
        //         },
        //         // @ts-ignore
        //         timestamp: response.messageTimestamp.low,
        //     }
        // }
        return response;
    };
    const sendLink = async (id, link, description, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let obj = {};
        let type = 'link';
        let text = `${link}${description ? '\n' + description : ''}`;
        const exists = await onWhatsApp(jid);
        //@ts-ignore
        jid = exists[0] ? exists[0].jid : jid;
        //@ts-ignore
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0], detectLinks: true } : { detectLinks: true };
            let response = await sendMessage(jid, { text: text }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.extendedTextMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: false,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    content: response.message.extendedTextMessage.text,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: false,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    content: response.message.extendedTextMessage.text,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    reply: {
                        id: response.message.extendedTextMessage.contextInfo.stanzaId,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendVideo = async (id, file, text, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let type = 'video';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0], caption: text } : { caption: text };
            let response = await sendMessage(jid, { video: data, caption: text }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.videoMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.videoMessage.url,
                        caption: !response.message.videoMessage.caption ? '' : response.message.videoMessage.caption,
                        mimetype: response.message.videoMessage.mimetype,
                        fileSha256: response.message.videoMessage.fileSha256,
                        fileLength: response.message.videoMessage.fileLength,
                        mediaKey: response.message.videoMessage.mediaKey,
                        fileEncSha256: response.message.videoMessage.fileEncSha256,
                        directPath: response.message.videoMessage.directPath,
                        thumbnail: response.message.videoMessage.jpegThumbnail,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.videoMessage.url,
                        caption: !response.message.videoMessage.caption ? '' : response.message.videoMessage.caption,
                        mimetype: response.message.videoMessage.mimetype,
                        fileSha256: response.message.videoMessage.fileSha256,
                        fileLength: response.message.videoMessage.fileLength,
                        mediaKey: response.message.videoMessage.mediaKey,
                        fileEncSha256: response.message.videoMessage.fileEncSha256,
                        directPath: response.message.videoMessage.directPath,
                        thumbnail: response.message.videoMessage.jpegThumbnail,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.videoMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendDocument = async (id, file, filename, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let mime = mimetype.contentType(file.split('.').pop());
        let infoFile = filename ? filename : pushInfoFile(file).fileName;
        let type = 'document';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage
                ? { quoted: quotedMessage[0] }
                : {};
            //@ts-ignore
            let response = await sendMessage(jid, { document: data, fileName: infoFile, mimetype: mime }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.documentMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    // @ts-ignore
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    // @ts-ignore
                    // @ts-ignore
                    file: {
                        url: response.message.documentMessage.url,
                        mimetype: response.message.documentMessage.mimetype,
                        title: response.message.documentMessage.title,
                        filename: response.message.documentMessage.fileName,
                        fileSha256: response.message.documentMessage.fileSha256,
                        fileLength: response.message.documentMessage.fileLength,
                        mediaKey: response.message.documentMessage.mediaKey,
                        fileEncSha256: response.message.documentMessage.fileEncSha256,
                        directPath: response.message.documentMessage.directPath,
                        thumbnail: response.message.documentMessage.jpegThumbnail,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    // @ts-ignore
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    // @ts-ignore
                    file: {
                        url: response.message.documentMessage.url,
                        mimetype: response.message.documentMessage.mimetype,
                        title: response.message.documentMessage.title,
                        filename: response.message.documentMessage.fileName,
                        fileSha256: response.message.documentMessage.fileSha256,
                        fileLength: response.message.documentMessage.fileLength,
                        mediaKey: response.message.documentMessage.mediaKey,
                        fileEncSha256: response.message.documentMessage.fileEncSha256,
                        directPath: response.message.documentMessage.directPath,
                        thumbnail: response.message.documentMessage.jpegThumbnail,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.documentMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendLocation = async (id, latitude, logitude, title, address, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let type = 'location';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            let response = await sendMessage(jid, { location: { name: title, address: address, degreesLatitude: latitude, degreesLongitude: logitude } }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.locationMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: false,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    name: response.message.locationMessage.name,
                    address: response.message.locationMessage.address,
                    url: response.message.locationMessage.url,
                    thumbnail: response.message.locationMessage.jpegThumbnail,
                    latitude: response.message.locationMessage.degreesLatitude,
                    longitude: response.message.locationMessage.degreesLongitude,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: false,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    name: response.message.locationMessage.name,
                    address: response.message.locationMessage.address,
                    url: response.message.locationMessage.url,
                    thumbnail: response.message.locationMessage.jpegThumbnail,
                    latitude: response.message.locationMessage.degreesLatitude,
                    longitude: response.message.locationMessage.degreesLongitude,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.locationMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendContact = async (id, name, contact, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n'
            + 'FN:' + name + '\n' // full name
            + 'ORG:' + name + ';\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=' + contact + ':+55 ' + contact + '\n' // WhatsApp ID + phone number
            + 'END:VCARD';
        let type = 'contact';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            //@ts-ignore
            const response = await sendMessage(jid, {
                contacts: {
                    displayName: 'Jeff',
                    contacts: [{ vcard }]
                }
            }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.contactMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'contact',
                    isMedia: false,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    display: name,
                    vcard: response.message.contactMessage.vcard,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: false,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    display: name,
                    vcard: response.message.contactMessage.vcard,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    reply: {
                        id: response.message.contactMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendSticker = async (id, file, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let type = 'sticker';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            let response = await sendMessage(jid, { sticker: data }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.stickerMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.stickerMessage.url,
                        mimetype: response.message.stickerMessage.mimetype,
                        fileSha256: response.message.stickerMessage.fileSha256,
                        fileLength: response.message.stickerMessage.fileLength,
                        mediaKey: response.message.stickerMessage.mediaKey,
                        fileEncSha256: response.message.stickerMessage.fileEncSha256,
                        directPath: response.message.stickerMessage.directPath,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.stickerMessage.url,
                        mimetype: response.message.stickerMessage.mimetype,
                        fileSha256: response.message.stickerMessage.fileSha256,
                        fileLength: response.message.stickerMessage.fileLength,
                        mediaKey: response.message.stickerMessage.mediaKey,
                        fileEncSha256: response.message.stickerMessage.fileEncSha256,
                        directPath: response.message.stickerMessage.directPath,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.stickerMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendAudio = async (id, file, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let type = 'audio';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            let response = await sendMessage(jid, { audio: data }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.audioMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    content: response.message.conversation,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.audioMessage.url,
                        mimetype: response.message.audioMessage.mimetype,
                        fileSha256: response.message.audioMessage.fileSha256,
                        fileLength: response.message.audioMessage.fileLength,
                        seconds: response.message.audioMessage.seconds,
                        mediaKey: response.message.audioMessage.mediaKey,
                        fileEncSha256: response.message.audioMessage.fileEncSha256,
                        directPath: response.message.audioMessage.directPath,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    content: response.message.conversation,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.audioMessage.url,
                        mimetype: response.message.audioMessage.mimetype,
                        fileSha256: response.message.audioMessage.fileSha256,
                        fileLength: response.message.audioMessage.fileLength,
                        seconds: response.message.audioMessage.seconds,
                        mediaKey: response.message.audioMessage.mediaKey,
                        fileEncSha256: response.message.audioMessage.fileEncSha256,
                        directPath: response.message.audioMessage.directPath,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.audioMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendVoice = async (id, file, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let type = 'voice';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : { ptt: true, opus: true };
            let response = await sendMessage(jid, { audio: data, ptt: true, mimetype: 'audio/ogg; codecs=opus' }, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            if (!response.message.audioMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    content: response.message.conversation,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.audioMessage.url,
                        mimetype: response.message.audioMessage.mimetype,
                        fileSha256: response.message.audioMessage.fileSha256,
                        fileLength: response.message.audioMessage.fileLength,
                        seconds: response.message.audioMessage.seconds,
                        mediaKey: response.message.audioMessage.mediaKey,
                        fileEncSha256: response.message.audioMessage.fileEncSha256,
                        directPath: response.message.audioMessage.directPath,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    content: response.message.conversation,
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.audioMessage.url,
                        mimetype: response.message.audioMessage.mimetype,
                        fileSha256: response.message.audioMessage.fileSha256,
                        fileLength: response.message.audioMessage.fileLength,
                        seconds: response.message.audioMessage.seconds,
                        mediaKey: response.message.audioMessage.mediaKey,
                        fileEncSha256: response.message.audioMessage.fileEncSha256,
                        directPath: response.message.audioMessage.directPath,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.audioMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendGif = async (id, file, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let data = file.indexOf('https://') > -1 || file.indexOf('http://') > -1 ? { url: file } : fs.readFileSync(file);
        let obj = {};
        let type = 'gif';
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            let response = await sendMessage(jid, { video: data, gifPlayback: true }, objM);
            if (!response.message.videoMessage.contextInfo) {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.videoMessage.url,
                        mimetype: response.message.videoMessage.mimetype,
                        fileSha256: response.message.videoMessage.fileSha256,
                        fileLength: response.message.videoMessage.fileLength,
                        height: response.message.videoMessage.height,
                        width: response.message.videoMessage.width,
                        mediaKey: response.message.videoMessage.mediaKey,
                        fileEncSha256: response.message.videoMessage.fileEncSha256,
                        directPath: response.message.videoMessage.directPath,
                        thumbnail: response.message.videoMessage.jpegThumbnail,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
            else {
                obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    device: Mode_1.optionsDefault.phoneNumber,
                    status: 200,
                    type: 'reply',
                    subtype: type,
                    isMedia: true,
                    id: response.key.id,
                    to: response.key.remoteJid.split('@')[0],
                    isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                    file: {
                        url: response.message.videoMessage.url,
                        mimetype: response.message.videoMessage.mimetype,
                        fileSha256: response.message.videoMessage.fileSha256,
                        fileLength: response.message.videoMessage.fileLength,
                        height: response.message.videoMessage.height,
                        width: response.message.videoMessage.width,
                        mediaKey: response.message.videoMessage.mediaKey,
                        fileEncSha256: response.message.videoMessage.fileEncSha256,
                        directPath: response.message.videoMessage.directPath,
                        thumbnail: response.message.videoMessage.jpegThumbnail,
                    },
                    participant: response.key.remoteJid.split('@')[0].length > 14 ? response.participant.split('@')[0] : '',
                    reply: {
                        id: response.message.videoMessage.contextInfo.stanzaId,
                    },
                    // @ts-ignore
                    timestamp: response.messageTimestamp.low,
                };
            }
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const sendList = async (id, btnName, sections, description, caption, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        let obj = {};
        let type = 'list';
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            // send a list message!
            // const sections = [
            //     {
            // 	title: "Section 1",
            // 	rows: [
            // 	    {title: "Option 1", rowId: "option1"},
            // 	    {title: "Option 2", rowId: "option2", description: "This is a description"}
            // 	]
            //     },
            //    {
            // 	title: "Section 2",
            // 	rows: [
            // 	    {title: "Option 3", rowId: "option3"},
            // 	    {title: "Option 4", rowId: "option4", description: "This is a description V2"}
            // 	]
            //     },
            // ]
            const listMessage = {
                text: caption,
                footer: description,
                title: process_1.title,
                buttonText: btnName,
                sections
            };
            let response = await sendMessage(jid, listMessage, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                isMedia: false,
                id: response.key.id,
                to: response.key.remoteJid.split('@')[0],
                // title: response.message.templateMessage.hydratedTemplate.hydratedContentText,
                // description: response.message.templateMessage.hydratedTemplate.hydratedFooterText,
                isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                // @ts-ignore
                timestamp: response.messageTimestamp.low,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
    };
    const sendButtons = async (id, title, buttons, description, image, replyIdMessage) => {
        let jid = id.indexOf('@') > -1 ? id : id.length > 14 ? id + '@g.us' : id + '@s.whatsapp.net';
        const buttonMessage = {
            text: title,
            footer: description,
            templateButtons: buttons,
            image: { url: image }
        };
        let type = 'buttons';
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists ? exists[0].jid : jid;
        if (id.length < 15 && exists && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'phone number not is whatsapp',
            });
        }
        try {
            let quotedMessage = replyIdMessage ? db.find((msg) => msg.key.id === replyIdMessage) : undefined;
            let objM = {};
            objM = replyIdMessage ? { quoted: quotedMessage[0] } : {};
            //@ts-ignore
            let response = await sendMessage(jid, buttonMessage, objM);
            let row = db.exists(response.key.id);
            if (!row) {
                db.create(response.key.id, response);
            }
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                isMedia: false,
                id: response.key.id,
                to: response.key.remoteJid.split('@')[0],
                title: response.message.templateMessage.hydratedTemplate.hydratedContentText,
                description: response.message.templateMessage.hydratedTemplate.hydratedFooterText,
                isgroup: response.key.remoteJid.split('@')[0].length > 14 ? true : false,
                // @ts-ignore
                timestamp: response.messageTimestamp.low,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    return {
        ...sock,
        sendText,
        sendImage,
        sendLink,
        sendVideo,
        sendDocument,
        sendAudio,
        sendVoice,
        sendLocation,
        sendContact,
        sendSticker,
        sendList,
        sendButtons
    };
};
exports.makeMessagesAdittionalSocket = makeMessagesAdittionalSocket;
