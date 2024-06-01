"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
// Custom token for domain
morgan_1.default.token('domain', function (req, res) {
    return req.headers.host; // Retrieving the domain from the Host header
});
// Logging middleware with custom format
server.use((0, morgan_1.default)(':method :url :status :response-time ms - :res[content-length] - :domain'));
// server.use(morgan("dev"));
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use(express_1.default.static("../front"));
server.use(indexRouter_1.default);
// Error handling middleware
server.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({ error: err.message });
});
exports.default = server;
