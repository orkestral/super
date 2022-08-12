"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSettingChange = exports.makeGroupsAdittionalSocket = void 0;
const groups_1 = require("./groups");
const Mode_1 = require("../Mode");
const makeGroupsAdittionalSocket = (config) => {
    const { logger } = config;
    const sock = groups_1.makeGroupsSocket(config);
    const { ev, authState, groupCreate, groupParticipantsUpdate, groupUpdateSubject, groupUpdateDescription, groupSettingUpdate, groupLeave, groupInviteCode, groupAcceptInvite, groupRevokeInvite } = sock;
    const createGroup = async (name, participants) => {
        let type = 'create-group';
        let obj = {};
        let members = [];
        if (typeof participants == 'object') {
            participants.forEach((element) => {
                members.push(element + '@s.whatsapp.net');
            });
        }
        try {
            let response = await groupCreate(name, members);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                type: type,
                status: 200,
                groupId: response.id.split('@')[0],
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
    const addParticipantsGroup = async (id, participants) => {
        let type = 'add-group';
        let obj = {};
        let members = [];
        let jid = id + '@g.us';
        if (typeof participants == 'object') {
            participants.forEach((element) => {
                members.push(element + '@s.whatsapp.net');
            });
        }
        try {
            let response = await groupParticipantsUpdate(jid, members, "add");
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
    const removeParticipantsGroup = async (id, participants) => {
        let type = 'remove-group';
        let obj = {};
        let members = [];
        let jid = id + '@g.us';
        if (typeof participants == 'object') {
            participants.forEach((element) => {
                members.push(element + '@s.whatsapp.net');
            });
        }
        try {
            let response = await groupParticipantsUpdate(jid, members, "remove");
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
    const addGroupAdmins = async (id, participants) => {
        let type = 'add-group-admins';
        let obj = {};
        let members = [];
        let jid = id + '@g.us';
        if (typeof participants == 'object') {
            participants.forEach((element) => {
                members.push(element + '@s.whatsapp.net');
            });
        }
        try {
            let response = await groupParticipantsUpdate(jid, members, "promote");
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
                message: 'there was an error in the call, check all parameters',
            };
        }
        return obj;
    };
    const removeGroupAdmins = async (id, participants) => {
        let type = 'remove-group-admins';
        let obj = {};
        let members = [];
        let jid = id + '@g.us';
        if (typeof participants == 'object') {
            participants.forEach((element) => {
                members.push(element + '@s.whatsapp.net');
            });
        }
        try {
            let response = await groupParticipantsUpdate(jid, members, "demote");
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
    const groupTitle = async (id, title) => {
        let type = 'group-title';
        let obj = {};
        let jid = id + '@g.us';
        try {
            let response = await groupUpdateSubject(jid, title);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
    const groupDescription = async (id, description) => {
        let type = 'group-descript';
        let obj = {};
        let jid = id + '@g.us';
        try {
            let response = await groupUpdateDescription(jid, description);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
    const leaveGroup = async (id) => {
        let type = 'leave-group';
        let obj = {};
        let jid = id + '@g.us';
        try {
            let response = await groupLeave(jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
    const getGroupLink = async (id) => {
        let type = 'get-group-link';
        let obj = {};
        let jid = id + '@g.us';
        try {
            let response = await groupInviteCode(jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                linkGroup: response,
            };
        }
        catch (error) {
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 404,
                type: type,
                message: 'there was an error in the call, check all parameters or you are not group admin',
            };
        }
        return obj;
    };
    const revokeGroupLink = async (id) => {
        let type = 'revoke-group-link';
        let obj = {};
        let jid = id + '@g.us';
        try {
            let response = await groupRevokeInvite(jid);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                linkGroup: response.split('@')[0],
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
    const joinGroup = async (code) => {
        let type = 'join-group';
        let obj = {};
        try {
            let response = await groupAcceptInvite(code);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type,
                groupId: response.split('@')[0],
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
    const setGroupSettings = async (id, option, boolean) => {
        let type = 'set-group-settings';
        let obj = {};
        let jid = id + '@g.us';
        let selected = option == 'message' ? (boolean ? optionsSettings.sendMessagesAdmins : optionsSettings.noSendMessagesAdmins) : (boolean ? optionsSettings.changeSettingsAdmins : optionsSettings.noChangeSettingsAdmins);
        try {
            //@ts-ignore
            let response = await groupSettingUpdate(jid, selected);
            obj = {
                session: Mode_1.optionsDefault.sessionName,
                device: Mode_1.optionsDefault.phoneNumber,
                status: 200,
                type: type
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
        createGroup,
        addParticipantsGroup,
        removeParticipantsGroup,
        addGroupAdmins,
        removeGroupAdmins,
        groupTitle,
        groupDescription,
        leaveGroup,
        getGroupLink,
        joinGroup,
        setGroupSettings,
        revokeGroupLink,
        ...sock,
    };
};
exports.makeGroupsAdittionalSocket = makeGroupsAdittionalSocket;
var GroupSettingChange;
(function (GroupSettingChange) {
    GroupSettingChange["messageSend"] = "announcement";
    GroupSettingChange["noMessageSend"] = "not_announcement";
    GroupSettingChange["settingsChange"] = "locked";
    GroupSettingChange["noSettingsChange"] = "unlocked";
})(GroupSettingChange = exports.GroupSettingChange || (exports.GroupSettingChange = {}));
var optionsSettings;
(function (optionsSettings) {
    optionsSettings["sendMessagesAdmins"] = "announcement";
    optionsSettings["changeSettingsAdmins"] = "locked";
    optionsSettings["noSendMessagesAdmins"] = "not_announcement";
    optionsSettings["noChangeSettingsAdmins"] = "unlocked";
})(optionsSettings || (optionsSettings = {}));
