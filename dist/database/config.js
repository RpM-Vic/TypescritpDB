"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDb = exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dbDir = __dirname;
const dbPath = path_1.default.join(dbDir, 'data.db');
// Ensure the database directory exists
if (!fs_1.default.existsSync(dbDir)) {
    fs_1.default.mkdirSync(dbDir, { recursive: true });
}
// Open the database file
exports.db = new sqlite3_1.default.Database(dbPath, sqlite3_1.default.OPEN_READWRITE | sqlite3_1.default.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    }
    else {
        console.log('Connected to the SQLite database.');
        // Perform database operations here
        initializeDatabase();
    }
});
// Function to initialize the database (create tables, etc.)
const initializeDatabase = () => {
    exports.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)', (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Table created or already exists.');
        }
    });
};
// Function to close the database connection
const closeDb = (callback) => {
    exports.db.close((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.message);
        }
        else {
            console.log('Closed the database connection.');
        }
        callback(err);
    });
};
exports.closeDb = closeDb;
//# sourceMappingURL=config.js.map