"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mode_1 = require("../Mode");
const events_1 = require("./events");
// export the last socket layer
const makeWASocket = (config) => (events_1.makeEventsSocket({
    ...Mode_1.DEFAULT_CONNECTION_CONFIG,
    ...config
}));
exports.default = makeWASocket;
