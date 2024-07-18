
//app.ts
import dotenv from 'dotenv'
import Server from './models/server'

dotenv.config()

const server = new Server()
server.listen()

// Handle server shutdown gracefully
/* process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close();
    process.exit(0);
}); */


