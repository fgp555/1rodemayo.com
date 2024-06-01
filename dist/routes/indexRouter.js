"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersRouter_1 = __importDefault(require("./usersRouter"));
const turnsRouter_1 = __importDefault(require("./turnsRouter"));
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
indexRouter.use("/users", usersRouter_1.default);
indexRouter.use("/turns", turnsRouter_1.default);
exports.default = indexRouter;
