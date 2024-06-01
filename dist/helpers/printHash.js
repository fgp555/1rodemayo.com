"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHash = exports.sha256 = void 0;
// Function to hash a string using SHA-256
function sha256(str) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const buffer = yield crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
            const hashArray = Array.from(new Uint8Array(buffer));
            const hashHex = hashArray.map(byte => ('0' + byte.toString(16)).slice(-2)).join('');
            return hashHex;
        }
        catch (error) {
            throw new Error("Error hashing the string: " + error);
        }
    });
}
exports.sha256 = sha256;
// Function to print the hash of a string
function printHash(inputString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield sha256(inputString);
            console.log(hash);
        }
        catch (error) {
            console.error("Error hashing the string:", error);
        }
    });
}
exports.printHash = printHash;
// Call the function to print the hash
// printHash("password123");
// // Import the functions from the previous file
// import { printHash } from './tempExport';
// // Call the function to print the hash
// printHash("password123");
