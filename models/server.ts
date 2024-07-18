
//server.ts
import express, { Application } from 'express';
import userRoutes from '../routes/usuarios.routes';
import cors from 'cors';
import db from '../database/config2';

class Server {
    private app: express.Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (err) {
            throw new Error(`Unable to connect to the database: ${err}`);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
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

    async close() {
        try {
            await db.close();
            console.log('Database connection closed.');
            process.exit(0);
        } catch (err) {
            console.error('Error closing database connection:', err);
            process.exit(1);
        }
    }
}

export default Server;