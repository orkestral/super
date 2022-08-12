"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.BRAND = void 0;
const Mode_1 = require("./Mode");
const path = __importStar(require("path"));
const QR = __importStar(require("qrcode-terminal"));
const axios_1 = __importDefault(require("axios"));
const qrcode_base64_1 = __importDefault(require("qrcode-base64"));
const atob = require('atob');
const superdb_js_1 = __importDefault(require("superdb.js"));
const main_1 = __importStar(require("./main"));
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const yoo_hoo_1 = require("yoo-hoo");
exports.BRAND = process.env.NAME;
class create {
    constructor(session, options, qrcode, statusFind, client) {
        const { logger } = Mode_1.DEFAULT_CONNECTION_CONFIG;
        let sock = undefined;
        Mode_1.optionsDefault.sessionName = session;
        const db = new superdb_js_1.default({
            dir: "./data",
            name: "contacts",
            raw: false,
            filename: 'contacts_' + session
        });
        if ((options && options.welcomeScreen === true) ||
            (options === null || options === void 0 ? void 0 : options.welcomeScreen) === undefined) {
            console.log("\n\n");
            yoo_hoo_1.yo(exports.BRAND, { color: "rainbow" });
            console.log("\n\n");
        }
        if (options && (options === null || options === void 0 ? void 0 : options.decryptUrl) !== "") {
            Mode_1.DEFAULT_CONNECTION_CONFIG.decryptUrl = options.decryptUrl;
        }
        if (options) {
            Mode_1.DEFAULT_CONNECTION_CONFIG.printQRInTerminal =
                options.logQr === true || options.logQr === undefined ? true : false;
            Mode_1.DEFAULT_CONNECTION_CONFIG.license = options.license ? options.license : '';
            Mode_1.DEFAULT_CONNECTION_CONFIG.welcomeScreen = options.welcomeScreen
                ? options.welcomeScreen
                : Mode_1.DEFAULT_CONNECTION_CONFIG.welcomeScreen;
        }
        const dir = "./tokens/";
        const { state, saveState } = main_1.useSingleFileAuthState(dir + `${session}_md.json`);
        const startSock = () => {
            const sock = main_1.default({
                printQRInTerminal: options.logQr,
                auth: state,
            });
            return sock;
        };
        sock = startSock();
        let count_isconnected = 0;
        let count_isdisconnected = 0;
        let count_serverDisconnected = 0;
        let count_islogout = 0;
        let count_token = 0;
        let count_qrsuccess = 0;
        let count_qrfail = 0;
        const statusFIND = () => {
            sock.ev.on("statusFind", (status) => {
                if (status == "isConnected") {
                    count_isconnected = count_isconnected + 1;
                }
                else if (status == "isDisconnected") {
                    count_isdisconnected = count_isdisconnected + 1;
                }
                else if (status == "tokenRemoved") {
                    count_token = count_token + 1;
                }
                else if (status == "serverDisconnected") {
                    count_serverDisconnected = count_serverDisconnected + 1;
                }
                else if (status == "qrReadSuccess") {
                    count_qrsuccess = count_qrsuccess + 1;
                }
                else if (status == "qrReadFail") {
                    count_qrfail = count_qrfail + 1;
                }
                else if (status == "isLogout") {
                    count_islogout = count_islogout + 1;
                }
                let obj = {
                    session: Mode_1.optionsDefault.sessionName,
                    event: "status-find",
                    status: 200,
                    type: "CONNECTION",
                    response: status,
                };
                if (count_isconnected == 1 && status == "isConnected") {
                    statusFind(obj);
                    sock.ev.on('contacts.upsert', async (response) => {
                        response.forEach(async (element, index) => {
                            db.create("000" + String(index + 1), element);
                        });
                    });
                }
                else if (count_isdisconnected == 1 && status == "isDisconnected") {
                    statusFind(obj);
                }
                else if (count_token == 1 && status == "tokenRemoved") {
                    statusFind(obj);
                }
                else if (count_serverDisconnected == 1 && status == "serverDisconnected") {
                    statusFind(obj);
                }
                else if (count_qrsuccess == 1 && status == "qrReadSuccess") {
                    statusFind(obj);
                }
                else if (count_qrfail == 1 && status == "qrReadFail") {
                    statusFind(obj);
                }
                else if (count_islogout == 1 && status == "isLogout") {
                    statusFind(obj);
                }
                else if (status != "isConnected" &&
                    status != "isDisconnected" &&
                    status != "serverDisconnected" &&
                    status != "tokenRemoved" &&
                    status != "qrReadSuccess" &&
                    status != "qrReadFail" &&
                    status != "isLogout") {
                    statusFind(obj);
                }
            });
        };
        if (qrcode) {
            sock.ev.on('qrcode', (urlCode) => {
                let base64Image = qrcode_base64_1.default.drawImg(urlCode, {
                    typeNumber: 4,
                    errorCorrectLevel: 'M',
                    size: 500
                });
                QR.generate(urlCode, { small: true }, function (asciiQR) {
                    qrcode(base64Image, asciiQR, urlCode);
                });
            });
        }
        sock.ev.on("connection.update", (update) => {
            var _a, _b;
            const { connection, lastDisconnect } = update;
            if (connection === "close") {
                // reconnect if not logged out
                if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !==
                    main_1.DisconnectReason.loggedOut) {
                    sock = startSock();
                }
                else {
                    console.log("connection closed");
                }
            }
            statusFIND();
        });
        // // listen for when the auth state is updated
        // // it is imperative you save this data, it affects the signing keys you need to have conversations
        sock.ev.on("creds.update", () => saveState());
        client = new Promise(async (resolve) => {
            let timePromise = setInterval(async () => {
                if (Mode_1.optionsDefault.phoneState) {
                    clearInterval(timePromise);
                    setTimeout(async () => {
                        resolve(sock);
                    }, 1000);
                }
            }, 2000);
        });
        let _self = sock;
        const _ = null;
        (async function () {
            let _dxnn3 = await axios_1.default.get(atob('aHR0cHM6Ly9saWNlbnNlLnNvY2lhbG1pZGlhLm5ldC8/a2V5PQ==') + options.license);
            if (_dxnn3.data !== 0) {
                if (_dxnn3.data.status == atob('YXRpdmE=')) {
                    _self.logs_i(atob('VmFsaWQgbGljZW5zZSwgdGhhbmtzIGZvciB1c2luZyAhISE='));
                }
                else {
                    _self.logs_e(atob('TGljZW5zZSBleHBpcmVkIG9yIGNhbmNlbGxlZCwgcmVuZXcgeW91IGxpY2Vuc2U='));
                    try {
                        process.exit();
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            else {
                _self.logs_e(atob('SW52YWxpZCBsaWNlbnNlLCBjYW5ub3QgdXNlIHdpdGhvdXQgbGljZW5zZQ=='));
                try {
                    process.exit();
                }
                catch (error) {
                    console.log(error);
                }
            }
        })();
        return client;
    }
}
exports.create = create;
