"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWALegacySocket = void 0;
const Connection_1 = __importDefault(require("./Connection"));
const FireSKT_1 = __importDefault(require("./FireSKT"));
exports.makeWALegacySocket = FireSKT_1.default;
__exportStar(require("./Proto"), exports);
__exportStar(require("./Settings"), exports);
__exportStar(require("./Models"), exports);
//export * from './Store'
__exportStar(require("./Mode"), exports);
__exportStar(require("./Internal"), exports);
exports.default = Connection_1.default;
