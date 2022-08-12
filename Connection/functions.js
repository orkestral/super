"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presence = exports.ChatModification = exports.makeFunctionsSocket = void 0;
const messagens_aditionais_1 = require("./messagens_aditionais");
const Mode_1 = require("../Mode");
const messages_media_1 = require("../Settings/messages-media");
const fs = require("fs");
const mimetype = require("mime-types");
const superdb_js_1 = __importDefault(require("superdb.js"));
const axios_1 = __importDefault(require("axios"));
const makeFunctionsSocket = (config) => {
    const { logger } = config;
    const sock = messagens_aditionais_1.makeMessagesAdittionalSocket(config);
    const { onWhatsApp, fetchStatus, profilePictureUrl, updateProfilePicture, chatModify, updateBlockStatus, sendMessage, sendPresenceUpdate, fetchBlocklist, groupFetchAllParticipating, sendReadReceipt, groupMetadata, } = sock;
    const db = new superdb_js_1.default({
        dir: "./data",
        name: "contacts",
        raw: false,
        filename: 'contacts_' + Mode_1.optionsDefault.sessionName
    });
    const db_messages = new superdb_js_1.default({
        dir: "./data",
        name: "messages",
        raw: false,
        filename: 'messages_' + Mode_1.optionsDefault.sessionName
    });
    const getNumberProfile = async (id) => {
        let type = "get-number-profile";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        try {
            let response = await onWhatsApp(jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                phone: response[0].jid.split("@")[0],
                exist: response[0].exists,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const getProfileStatus = async (id) => {
        let type = "get-profile-status";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            let response = await fetchStatus(jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: response.status,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const getPicture = async (id) => {
        let type = "get-picture";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            let response = null;
            try {
                response = await profilePictureUrl(jid);
            }
            catch (error) {
                //
            }
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                picture: response,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const setPicture = async (id, file) => {
        let type = "set-picture";
        let data;
        data = fs.readFileSync(file);
        let obj = {};
        let jid = (id === null || id === void 0 ? void 0 : id.indexOf("@")) > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            let response = await updateProfilePicture(jid, { url: data });
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                type: type,
                status: 200,
                url: response,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const archiveChat = async (id, boolean) => {
        let type = "archive-chat";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        let selected = boolean
            ? ChatModification.archive
            : ChatModification.unarchive;
        try {
            let key = {
                remoteJid: jid,
                fromMe: true,
            };
            await chatModify({ archive: true, lastMessages: [] }, jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const pinChat = async (id, boolean) => {
        let type = "pin-chat";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const muteChat = async (id, timer) => {
        let type = "mute-chat";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            let hour = 1633687967;
            let week = 1634263921;
            let year = -1;
            let timerSelect = hour;
            switch (timer) {
                case "week":
                    timerSelect = week;
                    break;
                case "ever":
                    timerSelect = year;
                    break;
            }
            await chatModify({ mute: timerSelect, lastMessages: [] }, jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const unmuteChat = async (id) => {
        let type = "unmute-chat";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            await chatModify({ mute: null, lastMessages: [] }, jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const deleteChat = async (id) => {
        let type = "delete-chat";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const blockContact = async (id) => {
        let type = "block-contact";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            await updateBlockStatus(jid, "block");
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const unblockContact = async (id) => {
        let type = "unblock-contact";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            await updateBlockStatus(jid, "unblock");
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const deleteMessageAll = async (id, messageId) => {
        let type = "delete-chat-all";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            let key = {
                remoteJid: jid,
                fromMe: true,
                id: messageId,
            };
            await sendMessage(jid, { delete: key });
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const deleteMessageMe = async (id, messageId) => {
        let type = "delete-chat-me";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            await chatModify({ clear: { messages: [{ id: messageId, fromMe: true }] } }, jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const getBlockList = async () => {
        let type = "get-block-list";
        let obj = {};
        try {
            //@ts-ignore
            let list = Object.assign((await fetchBlocklist()).content[0].content).map((el) => el.attrs.jid.split("@")[0]);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                list: list,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const getAllContacts = async () => {
        let type = "get-all-contacts";
        let obj = {};
        let contacts = [];
        let list = db.all();
        list.forEach((el) => {
            let obj_l = {
                id: el.id.split('@')[0],
                name: el.name,
            };
            contacts.push(obj_l);
        });
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 200,
            type: type,
            qt: contacts.length,
            contacts: contacts,
        };
    };
    const getBatteryLevel = async () => {
        let type = "get-battery-level";
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const getHostDevice = async () => {
        let type = "get-host-device";
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const getChats = async () => {
        let type = "get-chats";
        let obj = {};
        obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
        return obj;
    };
    const getGroups = async () => {
        let type = "get-groups";
        let obj = {};
        let groups = [];
        Object.assign(Object.values(await groupFetchAllParticipating())).map(async (el) => {
            groups.push({
                id: el.id.split("@")[0],
                name: el.subject ? el.subject : "",
                restrict: el.restrict,
                announce: el.announce,
                creation: el.creation,
                owner: el.owner.split("@")[0],
                isAdmin: el.participants.filter((pt) => pt.id.split("@")[0] == Mode_1.optionsDefault.phoneNumber)[0].admin != null
                    ? true
                    : false,
                total_participants: el.participants.length,
                participants: el.participants.map((el) => {
                    return { id: el.id.split("@")[0], admin: el.admin };
                }),
            });
        });
        obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 200,
            type: type,
            groups: groups,
        };
        return obj;
    };
    const getConnectionState = async () => {
        let connect = Mode_1.optionsDefault.phoneState ? 'connected' : 'disconnected';
        let obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 200,
            type: 'get-connection-state',
            state: connect,
        };
        return obj;
    };
    const infoGroup = async (id) => {
        let type = "info-group";
        let obj = {};
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        let el = await groupMetadata(jid);
        obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 200,
            type: type,
            id: el.id.split("@")[0],
            name: el.subject ? el.subject : "",
            restrict: el.restrict,
            announce: el.announce,
            creation: el.creation,
            owner: el.owner.split("@")[0],
            isAdmin: el.participants.filter((pt) => pt.id.split("@")[0] == Mode_1.optionsDefault.phoneNumber)[0].admin != null
                ? true
                : false,
            total_participants: el.participants.length,
            participants: el.participants.map((el) => {
                return { id: el.id.split("@")[0], admin: el.admin };
            }),
        };
        return obj;
    };
    const decryptFile = async (message) => {
        let msg = db_messages.find(msg => msg.key.id == message.id);
        let buffer = null;
        let obj = {};
        if (msg[0].message.imageMessage || msg[0].message.documentMessage || msg[0].message.videoMessage || msg[0].message.audioMessage) {
            const m = await msg[0];
            if (!m.message)
                return; // if there is no text or media message
            const messageType = Object.keys(m.message)[0]; // get what type of message it is -- text, image, video
            // if the message is an image
            let typeMedia = m.message.imageMessage;
            let typeString = 'image';
            switch (messageType) {
                case 'imageMessage':
                    typeMedia = m.message.imageMessage;
                    typeString = 'image';
                    break;
                case 'documentMessage':
                    typeMedia = m.message.documentMessage;
                    typeString = 'document';
                    break;
                case 'videoMessage':
                    typeMedia = m.message.videoMessage;
                    typeString = 'video';
                    break;
                case 'audioMessage':
                    typeMedia = m.message.audioMessage;
                    typeString = 'audio';
                    break;
            }
            // download stream
            //@ts-ignore
            const stream = await messages_media_1.downloadContentFromMessage(typeMedia, typeString);
            buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: 'decrypt-file',
                buffer: buffer,
            };
        }
        else {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: 'decrypt-file',
                message: 'The message not is media',
            };
        }
        return obj;
    };
    const decryptByIdFile = async (id, msgId) => {
        let msg = db_messages.find(msg => msg.key.id == msgId);
        let buffer = null;
        let obj = {};
        if (msg[0].message.imageMessage || msg[0].message.documentMessage || msg[0].message.videoMessage || msg[0].message.audioMessage) {
            const m = await msg[0];
            if (!m.message)
                return; // if there is no text or media message
            const messageType = Object.keys(m.message)[0]; // get what type of message it is -- text, image, video
            // if the message is an image
            let typeMedia = m.message.imageMessage;
            let typeString = 'image';
            switch (messageType) {
                case 'imageMessage':
                    typeMedia = m.message.imageMessage;
                    typeString = 'image';
                    break;
                case 'documentMessage':
                    typeMedia = m.message.documentMessage;
                    typeString = 'document';
                    break;
                case 'videoMessage':
                    typeMedia = m.message.videoMessage;
                    typeString = 'video';
                    break;
                case 'audioMessage':
                    typeMedia = m.message.audioMessage;
                    typeString = 'audio';
                    break;
            }
            // download stream
            //@ts-ignore
            const stream = await messages_media_1.downloadContentFromMessage(typeMedia, typeString);
            buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: 'decrypt-by-id-file',
                buffer: buffer,
            };
        }
        else {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: 'decrypt-by-id-file',
                message: 'The message not is media',
            };
        }
        return obj;
    };
    const decryptRemote = async (id, msgId) => {
        var _a;
        let obj = {};
        let type = 'decrypt-remote';
        let msg = db_messages.find(msg => msg.key.id == msgId);
        let mime = msg[0].message[Object.keys(msg.message)[0]].mimetype;
        let filename = (_a = msg[0].message[Object.keys(msg.message)[0]]) === null || _a === void 0 ? void 0 : _a.fileName;
        try {
            const buffer = await axios_1.default.post(Mode_1.DEFAULT_CONNECTION_CONFIG.decryptUrl + '/decrypt', {
                message: msg,
                mimetype: filename ? filename.split('.')[1] : mimetype.extension(mime)
            });
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: 'decrypt-remote',
                url: Mode_1.DEFAULT_CONNECTION_CONFIG.decryptUrl + '/' + buffer.data.split('files/')[1],
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'Erro in params or Url not defined in create options',
            };
        }
        return obj;
    };
    const decryptFileSave = async (message, filename) => {
        var _a;
        let obj = {};
        let type = 'decrypt-file-save';
        let msg = db_messages.find(msg => msg.key.id == message.id);
        let buffer = null;
        if (msg[0].message.imageMessage || msg[0].message.documentMessage || msg[0].message.videoMessage || msg[0].message.audioMessage) {
            const m = await msg[0];
            if (!m.message)
                return; // if there is no text or media message
            const messageType = Object.keys(m.message)[0]; // get what type of message it is -- text, image, video
            // if the message is an image
            let typeMedia = m.message.imageMessage;
            let typeString = 'image';
            switch (messageType) {
                case 'imageMessage':
                    typeMedia = m.message.imageMessage;
                    typeString = 'image';
                    break;
                case 'documentMessage':
                    typeMedia = m.message.documentMessage;
                    typeString = 'document';
                    break;
                case 'videoMessage':
                    typeMedia = m.message.videoMessage;
                    typeString = 'video';
                    break;
                case 'audioMessage':
                    typeMedia = m.message.audioMessage;
                    typeString = 'audio';
                    break;
            }
            // download stream
            //@ts-ignore
            const stream = await messages_media_1.downloadContentFromMessage(typeMedia, typeString);
            buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let File = (_a = msg[0].message[Object.keys(msg[0].message)[0]]) === null || _a === void 0 ? void 0 : _a.fileName;
            let mime = File ? File.split('.')[1] : mimetype.extension(msg[0].message[Object.keys(msg[0].message)[0]].mimetype);
            let nameF = filename ? filename : msg[0].id;
            await fs.writeFileSync(nameF + '.' + mime, buffer);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                path: nameF + '.' + mime,
            };
        }
        else {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'The message not is media',
            };
        }
        return obj;
    };
    const decryptByIdFileSave = async (id, msgId, filename) => {
        var _a;
        let obj = {};
        let type = 'decrypt-file-save';
        let msg = db_messages.find(msg => msg.key.id == msgId);
        let buffer = null;
        if (msg[0].message.imageMessage || msg[0].message.documentMessage || msg[0].message.videoMessage || msg[0].message.audioMessage) {
            const m = await msg[0];
            if (!m.message)
                return; // if there is no text or media message
            const messageType = Object.keys(m.message)[0]; // get what type of message it is -- text, image, video
            // if the message is an image
            let typeMedia = m.message.imageMessage;
            let typeString = 'image';
            switch (messageType) {
                case 'imageMessage':
                    typeMedia = m.message.imageMessage;
                    typeString = 'image';
                    break;
                case 'documentMessage':
                    typeMedia = m.message.documentMessage;
                    typeString = 'document';
                    break;
                case 'videoMessage':
                    typeMedia = m.message.videoMessage;
                    typeString = 'video';
                    break;
                case 'audioMessage':
                    typeMedia = m.message.audioMessage;
                    typeString = 'audio';
                    break;
            }
            // download stream
            //@ts-ignore
            const stream = await messages_media_1.downloadContentFromMessage(typeMedia, typeString);
            buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let File = (_a = msg[0].message[Object.keys(msg[0].message)[0]]) === null || _a === void 0 ? void 0 : _a.fileName;
            let mime = File ? File.split('.')[1] : mimetype.extension(msg[0].message[Object.keys(msg[0].message)[0]].mimetype);
            let nameF = filename ? filename : msg[0].id;
            await fs.writeFileSync(nameF + '.' + mime, buffer);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                path: nameF + '.' + mime,
            };
        }
        else {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'The message not is media',
            };
        }
        return obj;
    };
    const setPresence = async (id, type) => {
        let presence = Presence.available;
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        let obj = {};
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: "set-presence",
                message: "phone number not is whatsapp",
            });
        }
        switch (type) {
            case "a":
                presence = Presence.available;
                break;
            case "c":
                presence = Presence.composing;
                break;
            case "r":
                presence = Presence.recording;
                break;
            case "p":
                presence = Presence.paused;
                break;
        }
        try {
            await sendPresenceUpdate(presence, jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: "set-presence",
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: "set-presence",
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    // const getConnectionState = async ()  => {
    //     let connect = this.phoneConnected ? 'connected' : 'disconnected'
    //     let obj = {
    //         session: optionsDefault.sessionName,
    //          device: optionsDefault.phoneNumber,
    //         status: 200,
    //         type: 'get-connection-state',
    //         state: connect,
    //     }
    //     return obj
    // }
    const markRead = async (id, messageId) => {
        let jid = id.indexOf("@") > -1
            ? id
            : id.length > 14
                ? id + "@g.us"
                : id + "@s.whatsapp.net";
        let type = "mark-read";
        let obj = {};
        const exists = await onWhatsApp(jid);
        jid = exists[0] ? exists[0].jid : jid;
        if (id.length < 15 && exists[0] && !exists[0].exists) {
            return (obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "phone number not is whatsapp",
            });
        }
        try {
            await sendReadReceipt(jid, undefined, [messageId]);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: "there was an error in the call, check all parameters",
            };
        }
        return obj;
    };
    const getName = async (id) => {
        let type = 'get-name';
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const getChatMessages = async (id, number) => {
        let type = 'get-chat-messages';
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const getChatAllMessages = async (id) => {
        let type = 'get-chat-all-messages';
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const getAllUnreadMessages = async () => {
        let type = 'get-all-unread-messages';
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    const getMessageById = async (id, idMsg) => {
        let type = 'get-chat-all-messages';
        let obj = {};
        return obj = {
            session: Mode_1.optionsDefault.sessionName,
            device: Mode_1.optionsDefault.phoneNumber,
            status: 404,
            type: type,
            message: "function not supported in Multidevice",
        };
    };
    return {
        ...sock,
        getAllContacts,
        getBatteryLevel,
        getBlockList,
        getGroups,
        getChats,
        setPresence,
        setPicture,
        blockContact,
        unblockContact,
        archiveChat,
        getPicture,
        deleteChat,
        deleteMessageAll,
        deleteMessageMe,
        markRead,
        muteChat,
        unmuteChat,
        pinChat,
        getNumberProfile,
        getProfileStatus,
        getHostDevice,
        infoGroup,
        decryptFile,
        decryptByIdFile,
        decryptRemote,
        decryptFileSave,
        decryptByIdFileSave,
        getConnectionState,
        getName,
        getChatMessages,
        getChatAllMessages,
        getAllUnreadMessages,
        getMessageById
    };
};
exports.makeFunctionsSocket = makeFunctionsSocket;
var ChatModification;
(function (ChatModification) {
    ChatModification["archive"] = "archive";
    ChatModification["unarchive"] = "unarchive";
    ChatModification["pin"] = "pin";
    ChatModification["unpin"] = "unpin";
    ChatModification["mute"] = "mute";
    ChatModification["unmute"] = "unmute";
    ChatModification["delete"] = "delete";
    ChatModification["clear"] = "clear";
})(ChatModification = exports.ChatModification || (exports.ChatModification = {}));
var Presence;
(function (Presence) {
    Presence["unavailable"] = "unavailable";
    Presence["available"] = "available";
    Presence["composing"] = "composing";
    Presence["recording"] = "recording";
    Presence["paused"] = "paused";
})(Presence = exports.Presence || (exports.Presence = {}));
