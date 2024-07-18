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
//server.ts
const express_1 = __importDefault(require("express"));
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const cors_1 = __importDefault(require("cors"));
const config2_1 = __importDefault(require("../database/config2"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config2_1.default.authenticate();
                console.log('Database online');
            }
            catch (err) {
                throw new Error(`Unable to connect to the database: ${err}`);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_routes_1.default);
        this.app.get('*', (req, res) => {
            res.status(404).json({ msg: 'Page not found' });
        });
    }
    listen() {
        const server = this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
        process.on('SIGINT', this.close.bind(this));
        process.on('SIGTERM', this.close.bind(this));
        return server;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config2_1.default.close();
                console.log('Database connection closed.');
                process.exit(0);
            }
            catch (err) {
                console.error('Error closing database connection:', err);
                process.exit(1);
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map