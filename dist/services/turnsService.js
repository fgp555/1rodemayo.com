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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
exports.default = {
    getAllTurnsService: () => __awaiter(void 0, void 0, void 0, function* () {
        // throw Error("not implemented servicios");
        const allTurnsData = yield data_source_1.TurnModelRepository.find();
        // const allTurnsData = await TurnModelRepository.find({ relations: { userId: true } });
        // const newArray = allTurnsData.map((obj) => {
        //   const {
        //     userId: { credentialsID, ...restUserId },
        //     ...restObj
        //   } = obj;
        //   return { ...restObj, userId: restUserId };
        // });
        // return newArray;
        return allTurnsData;
    }),
    getTurnByIdService: (idParam) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const foundUser = yield data_source_1.TurnModelRepository.findOneOrFail({ where: { id: idParam }, relations: ["userId"] });
            const _a = foundUser.userId, { credentialsID } = _a, restUserId = __rest(_a, ["credentialsID"]), restFoundUser = __rest(foundUser, ["userId"]);
            const newFoundUser = Object.assign(Object.assign({}, restFoundUser), { userId: restUserId });
            return newFoundUser;
        }
        catch (error) {
            throw new Error("user not found getTurnByIdService");
        }
    }),
    createTurnsService: (turnObject) => __awaiter(void 0, void 0, void 0, function* () {
        const { date, time, userId, description } = turnObject;
        const foundUserId = yield data_source_1.UserModelRepository.findOneBy({ id: userId });
        if (!foundUserId)
            throw Error("user not found");
        const newTurn = { date, time, description, status: "active", userId: foundUserId };
        const newTurnCreate = data_source_1.TurnModelRepository.create(newTurn);
        const newTurnSave = yield data_source_1.TurnModelRepository.save(newTurnCreate);
        return newTurnSave;
        // const foundUserId = await UserModelRepository.findOneBy({ id: 1 });
        // if (foundUserId)
        // TurnModelRepository.create({
        //   date:"2022-10-10",
        //   time: "2022-10-10",
        //   status: "active",
        //   userId: foundUserId
        // });
    }),
    cancelTurnService: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const foundTurnId = yield data_source_1.TurnModelRepository.findOneBy({ id });
        if (foundTurnId) {
            foundTurnId.status = "cancelled";
            yield data_source_1.TurnModelRepository.save(foundTurnId);
            return foundTurnId;
        }
        return "error turn not found";
    }),
    deleteTurnService: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const foundTurnId = yield data_source_1.TurnModelRepository.findOneBy({ id });
        if (foundTurnId) {
            const deletedTurnId = yield data_source_1.TurnModelRepository.delete({ id });
            return deletedTurnId;
        }
        return "error turn not found";
    }),
};
