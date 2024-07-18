import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = __dirname;
const dbPath = path.join(dbDir, 'data.db');

// Ensure the database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Open the database file
export const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Perform database operations here
        initializeDatabase();
    }
});

// Function to initialize the database (create tables, etc.)
const initializeDatabase = () => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)', (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        }
    });
};

// Function to close the database connection
export const closeDb = (callback: (err: Error | null) => void) => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.message);
        } else {
            console.log('Closed the database connection.');
        }
        callback(err);
    });
};
