"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turnsController_1 = __importDefault(require("../controllers/turnsController"));
const express_1 = require("express");
const turnsRouter = (0, express_1.Router)();
turnsRouter.get("/", turnsController_1.default.getAllTurnsController);
turnsRouter.get("/:id", turnsController_1.default.getTurnByIdController);
turnsRouter.post("/schedule", turnsController_1.default.createTurnController);
turnsRouter.put("/cancel/:id", turnsController_1.default.cancelTurnController);
turnsRouter.delete("/delete/:id", turnsController_1.default.deleteTurnController);
exports.default = turnsRouter;
