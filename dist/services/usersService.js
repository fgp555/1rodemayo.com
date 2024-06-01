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
const data_source_1 = require("../config/data-source");
const credentialsSevice_1 = require("./credentialsSevice");
exports.default = {
    getAllUsersService: () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield data_source_1.UserModelRepository.find({ relations: { turnsIds: true } });
        const newAllUsers = allUsers.map((user) => {
            const { id, name, email, birthdate, nDni, turnsIds } = user;
            return { id, name, email, birthdate, nDni, turnsIds };
        });
        // console.log(allUsers)
        // return newAllUsers;
        return allUsers;
    }),
    // getUserByIdService: async (idParam: number) /* : Promise<UserEntity | null> */ => {
    //   try {
    //     const foundUser = await UserModelRepository.findOneOrFail({ where: { id: idParam }, relations: ["turnsIds"] });
    //     const { id, name, email, birthdate, nDni, turnsIds } = foundUser;
    //     const newFoundUser = { id, name, email, birthdate, nDni, turnsIds };
    //     return newFoundUser;
    //     // return foundUser;
    //   } catch (error) {
    //     throw new Error("user not found getUserByIdService");
    //   }
    // },
    getUserByIdService: (idParam) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const foundUser = yield data_source_1.UserModelRepository.findOneOrFail({ where: { id: idParam }, relations: ["turnsIds"] });
            const { id, name, email, birthdate, nDni, turnsIds } = foundUser;
            const sortedTurnsIds = turnsIds.sort((a, b) => b.id - a.id); // Sort in descending order by id
            const newFoundUser = { id, name, email, birthdate, nDni, turnsIds: sortedTurnsIds };
            return newFoundUser;
            // return foundUser;
        }
        catch (error) {
            throw new Error("user not found getUserByIdService");
        }
    }),
    createUserService: (userObject) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, username, email, birthdate, nDni, password } = userObject;
        const credentialsID = yield (0, credentialsSevice_1.createCredentialService)({ username, password });
        const newUser = { name, email, birthdate, nDni, credentialsID };
        data_source_1.UserModelRepository.create(newUser);
        const newUserSave = yield data_source_1.UserModelRepository.save(newUser);
        return newUserSave;
    }),
    loginUserService: (userObject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = userObject;
            const credentialsID = yield (0, credentialsSevice_1.validateCredentialService)({ username, password });
            const foundUser = yield data_source_1.UserModelRepository.findOneByOrFail({ id: credentialsID });
            console.log("foundUser", foundUser);
            console.log("credentialsID", credentialsID);
            const { id, name, email, birthdate, nDni, turnsIds } = foundUser;
            const newFoundUser = { id, name, email, birthdate, nDni, turnsIds };
            // return newFoundUser;
            return foundUser;
        }
        catch (error) {
            throw Error("user not found");
        }
    }),
    deleteUserByIdService: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield data_source_1.UserModelRepository.delete({ id });
        console.log(deletedUser);
        return deletedUser;
    }),
    dropSchemaService: () => __awaiter(void 0, void 0, void 0, function* () {
        // Drop the entire schema
        yield data_source_1.AppDataSource.dropDatabase();
        console.log("Schema dropped successfully.");
        // After dropping, synchronize the entities to recreate the schema
        yield data_source_1.AppDataSource.synchronize();
        return "Schema recreated successfully.";
    }),
    // resetAllTablesService: async (): Promise<void> => {
    //   try {
    //     await TurnEntityModel.clear();
    //     await UserEntityModel.clear();
    //     // await CredentialEntityModel.clear();
    //     console.log("All tables have been reset.");
    //   } catch (error) {
    //     console.error("Error resetting tables:", error);
    //   }
    // },
};
