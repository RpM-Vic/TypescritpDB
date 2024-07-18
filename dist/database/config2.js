"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config2.ts
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dbPath = path_1.default.resolve(__dirname, 'data.sqlite3'); // Ensure this path is correct
// Ensure the database file exists
if (!fs_1.default.existsSync(dbPath)) {
    fs_1.default.writeFileSync(dbPath, '');
    console.log('SQLite database file created.');
}
const db = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: console.log, // Optional: disable logging of SQL queries
});
// Use { alter: true } for development to adjust tables without dropping data
db.sync({ alter: true })
    .then(() => {
    console.log('Database and tables created or altered!');
})
    .catch((err) => {
    console.error('Error syncing database:', err);
});
exports.default = db;
//# sourceMappingURL=config2.js.map