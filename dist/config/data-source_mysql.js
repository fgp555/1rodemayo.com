"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelRepository = exports.TurnModelRepository = exports.CredentialModelRepository = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const CredentialEntity_1 = require("../entities/CredentialEntity");
const TurnEntity_1 = require("../entities/TurnEntity");
const UserEntity_1 = require("../entities/UserEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql", // Change the database type to MySQL
    host: "localhost",
    port: 3306, // MySQL default port is 3306
    username: "root", // Change to your MySQL username
    password: "", // Change to your MySQL password
    database: "soyhenry_db",
    synchronize: true,
    logging: ["error"], // Logging only errors
    entities: [CredentialEntity_1.CredentialEntity, TurnEntity_1.TurnEntity, UserEntity_1.UserEntity],
    subscribers: [],
    migrations: [],
    dropSchema: true, // reset database
});
exports.CredentialModelRepository = exports.AppDataSource.getRepository(CredentialEntity_1.CredentialEntity);
exports.TurnModelRepository = exports.AppDataSource.getRepository(TurnEntity_1.TurnEntity);
exports.UserModelRepository = exports.AppDataSource.getRepository(UserEntity_1.UserEntity);
