"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAMessageStatus = exports.WAMessageStubType = exports.WAProto = void 0;
const Proto_1 = require("../Proto");
Object.defineProperty(exports, "WAProto", { enumerable: true, get: function () { return Proto_1.proto; } });
exports.WAMessageStubType = Proto_1.proto.WebMessageInfo.WebMessageInfoStubType;
exports.WAMessageStatus = Proto_1.proto.WebMessageInfo.WebMessageInfoStatus;
