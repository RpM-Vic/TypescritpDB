
// config2.ts
import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, 'data.sqlite3'); // Ensure this path is correct

// Ensure the database file exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
    console.log('SQLite database file created.');
}

const db = new Sequelize({
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

export default db;
