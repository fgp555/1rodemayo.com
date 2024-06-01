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
exports.getAllCredentialsService = exports.validateCredentialService = exports.createCredentialService = void 0;
const data_source_1 = require("../config/data-source");
const printHash_1 = require("../helpers/printHash");
const createCredentialService = (credentialsObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credentialsObject;
    const newCredential = { username, password: yield (0, printHash_1.sha256)(password) };
    data_source_1.CredentialModelRepository.create(newCredential);
    const CredentialEntitySave = yield data_source_1.CredentialModelRepository.save(newCredential);
    return CredentialEntitySave.id;
});
exports.createCredentialService = createCredentialService;
const validateCredentialService = (credentialObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credentialObject;
    const foundCredential = yield data_source_1.CredentialModelRepository.findOneBy({ username });
    if (!foundCredential)
        throw Error("user not found");
    if (foundCredential) {
        const isPasswordValid = foundCredential.password === (yield (0, printHash_1.sha256)(password));
        if (isPasswordValid) {
            return foundCredential.id;
        }
    }
    return undefined;
});
exports.validateCredentialService = validateCredentialService;
const getAllCredentialsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const credential_table = yield data_source_1.CredentialModelRepository.find();
    return credential_table;
});
exports.getAllCredentialsService = getAllCredentialsService;
