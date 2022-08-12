"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = require("../Settings");
const Proto_1 = require("../Proto");
const fs_1 = require("fs");
jest.setTimeout(20000);
const TEST_VECTORS = [
    {
        type: 'image',
        message: Proto_1.proto.ImageMessage.decode(Buffer.from('Ck1odHRwczovL21tZy53aGF0c2FwcC5uZXQvZC9mL0FwaHR4WG9fWXZZcDZlUVNSa0tjOHE5d2ozVUpleWdoY3poM3ExX3I0ektnLmVuYxIKaW1hZ2UvanBlZyIgKTuVFyxDc6mTm4GXPlO3Z911Wd8RBeTrPLSWAEdqW8MomcUBQiB7wH5a4nXMKyLOT0A2nFgnnM/DUH8YjQf8QtkCIekaSkogTB+BXKCWDFrmNzozY0DCPn0L4VKd7yG1ZbZwbgRhzVc=', 'base64')),
        plaintext: fs_1.readFileSync('./Media/cat.jpeg')
    },
    {
        type: 'image',
        message: Proto_1.proto.ImageMessage.decode(Buffer.from('Ck1odHRwczovL21tZy53aGF0c2FwcC5uZXQvZC9mL0Ftb2tnWkphNWF6QWZxa3dVRzc0eUNUdTlGeWpjMmd5akpqcXNmMUFpZEU5LmVuYxIKaW1hZ2UvanBlZyIg8IS5TQzdzcuvcR7F8HMhWnXmlsV+GOo9JE1/t2k+o9Yoz6o6QiA7kDk8j5KOEQC0kDFE1qW7lBBDYhm5z06N3SirfUj3CUog/CjYF8e670D5wUJwWv2B2mKzDEo8IJLStDv76YmtPfs=', 'base64')),
        plaintext: fs_1.readFileSync('./Media/icon.png')
    },
];
describe('Media Download Tests', () => {
    it('should download a full encrypted media correctly', async () => {
        for (const { type, message, plaintext } of TEST_VECTORS) {
            const readPipe = await Settings_1.downloadContentFromMessage(message, type);
            let buffer = Buffer.alloc(0);
            for await (const read of readPipe) {
                buffer = Buffer.concat([buffer, read]);
            }
            expect(buffer).toEqual(plaintext);
        }
    });
    it('should download an encrypted media correctly piece', async () => {
        for (const { type, message, plaintext } of TEST_VECTORS) {
            // check all edge cases
            const ranges = [
                { startByte: 51, endByte: plaintext.length - 100 },
                { startByte: 1024, endByte: 2038 },
                { startByte: 1, endByte: plaintext.length - 1 } // borders
            ];
            for (const range of ranges) {
                const readPipe = await Settings_1.downloadContentFromMessage(message, type, range);
                let buffer = Buffer.alloc(0);
                for await (const read of readPipe) {
                    buffer = Buffer.concat([buffer, read]);
                }
                const hex = buffer.toString('hex');
                const expectedHex = plaintext.slice(range.startByte || 0, range.endByte || undefined).toString('hex');
                expect(hex).toBe(expectedHex);
                console.log('success on ', range);
            }
        }
    });
});
