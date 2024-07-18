
//server.ts

import express,{Application} from 'express';
import userRoutes from '../routes/usuarios.routes'; //import * as userRoutes from... If I had more things to import from that origin
import cors from 'cors'

//import {closeDb} from '../database/config'
import db from '../database/config2'

class Server{
    private app:express.Application;
    private port:string;
    private apiPaths={ 
        usuarios:'/api'
    }

    constructor(){
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


    middlewares(){
        this.app.use(cors());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes);
        this.app.get('*',(req,res)=>{
            res.status(404).json({msg:'Page not found'});
        })
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`);
        })
    }

    // Close the database connection when the server shuts down
/*     close() {
        closeDb((err:Error|null) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    } */

}



export default Server;