"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//app.ts
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
// Handle server shutdown gracefully
/* process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close();
    process.exit(0);
}); */
//# sourceMappingURL=app.js.map