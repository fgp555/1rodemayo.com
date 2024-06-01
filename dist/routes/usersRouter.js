"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", usersController_1.default.getAllUsersController);
usersRouter.get("/:id", usersController_1.default.getUserByIdController);
usersRouter.post("/register", usersController_1.default.registerUserController);
usersRouter.post("/login", usersController_1.default.loginUserController);
usersRouter.delete("/delete/:id", usersController_1.default.deleteUserByIdController);
// temporal
usersRouter.patch("/credentials", usersController_1.default.getAllCredentialsController);
usersRouter.patch("/dropSchema", usersController_1.default.dropSchemaController);
exports.default = usersRouter;
