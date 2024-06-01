"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelRepository = exports.TurnModelRepository = exports.CredentialModelRepository = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const CredentialEntity_1 = require("../entities/CredentialEntity");
const TurnEntity_1 = require("../entities/TurnEntity");
const UserEntity_1 = require("../entities/UserEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "soyhenry_db",
    // dropSchema: true, // reset database
    synchronize: true,
    // logging: false, // display logs
    logging: [/* "query", */ "error"], // display logs
    entities: [CredentialEntity_1.CredentialEntity, TurnEntity_1.TurnEntity, UserEntity_1.UserEntity],
    subscribers: [],
    migrations: [],
});
exports.CredentialModelRepository = exports.AppDataSource.getRepository(CredentialEntity_1.CredentialEntity);
exports.TurnModelRepository = exports.AppDataSource.getRepository(TurnEntity_1.TurnEntity);
exports.UserModelRepository = exports.AppDataSource.getRepository(UserEntity_1.UserEntity);
