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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersService_1 = __importDefault(require("../services/usersService"));
const credentialsSevice_1 = require("../services/credentialsSevice");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.setHeader("token", "autenticado");
    res.json(yield usersService_1.default.getAllUsersService());
    // res.status(500).json({ message: "error getAllUsersController" });
});
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundUserId = yield usersService_1.default.getUserByIdService(Number(id));
    res.status(200).json(foundUserId);
    // res.status(500).json({ message: "error getUserByIdController" });
});
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    // return res.json({ backend_register: req.body });
    const { name, username, email, birthdate, nDni, password } = req.body;
    const newUser = yield usersService_1.default.createUserService({ name, username, email, birthdate, nDni, password });
    res.status(201).json(newUser);
    // res.status(500).json({ message: "error registerUserController" });
});
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    // return res.json({ backend_login: req.body });
    const { username, password } = req.body;
    const returnLoginSevice = yield usersService_1.default.loginUserService({ username, password });
    res.status(200).json({ login: true, user: returnLoginSevice });
    // res.status(500).json({ login: false, message: "error loginUserController" });
});
const deleteUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUserId = yield usersService_1.default.deleteUserByIdService(Number(id));
    res.status(200).json(deletedUserId);
    res.status(500).json({ message: "error deleteUserByIdController" });
});
// ========== temporal ==========
const getAllCredentialsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield (0, credentialsSevice_1.getAllCredentialsService)();
    res.json(credentials);
    res.status(500).json({ message: "error getAllCredentialsController" });
});
const dropSchemaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reset = yield usersService_1.default.dropSchemaService();
    res.json(reset);
    res.status(500).json({ message: "error resetAllTablesController" });
});
exports.default = {
    getAllUsersController: (0, catchAsync_1.default)(getAllUsersController),
    getUserByIdController: (0, catchAsync_1.default)(getUserByIdController),
    registerUserController: (0, catchAsync_1.default)(registerUserController),
    loginUserController: (0, catchAsync_1.default)(loginUserController),
    deleteUserByIdController: (0, catchAsync_1.default)(deleteUserByIdController),
    getAllCredentialsController: (0, catchAsync_1.default)(getAllCredentialsController),
    dropSchemaController: (0, catchAsync_1.default)(dropSchemaController),
};
