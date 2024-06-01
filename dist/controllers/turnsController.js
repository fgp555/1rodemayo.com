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
const turnsService_1 = __importDefault(require("../services/turnsService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const getAllTurnsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield turnsService_1.default.getAllTurnsService());
});
const getTurnByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).json(yield turnsService_1.default.getTurnByIdService(Number(id)));
});
const createTurnController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { date, time, userId } = req.body;
    res.status(201).json(yield turnsService_1.default.createTurnsService(req.body));
});
const cancelTurnController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).json(yield turnsService_1.default.cancelTurnService(Number(id)));
});
const deleteTurnController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).json(yield turnsService_1.default.deleteTurnService(Number(id)));
});
exports.default = {
    getAllTurnsController: (0, catchAsync_1.default)(getAllTurnsController),
    getTurnByIdController: (0, catchAsync_1.default)(getTurnByIdController),
    createTurnController: (0, catchAsync_1.default)(createTurnController),
    cancelTurnController: (0, catchAsync_1.default)(cancelTurnController),
    deleteTurnController: (0, catchAsync_1.default)(deleteTurnController),
};
