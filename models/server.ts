import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: String;
    private apiPaths = {
        users:'/api/users'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.dbConnect();
        this.middlewares();
        this.routes();
    }

    //TODO: add connection to database
    async dbConnect(){
        try {
            await db.authenticate();
            console.log('**CONEXION TO DB SUCCESS**');
        } catch (error) {
            throw new Error('Error to connect to database')
        }
    }
    routes(){
        this.app.use(this.apiPaths.users, userRoutes);
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //READ BODY
        this.app.use(express.json());
        //Public site
        this.app.use(express.static('public'));

    }
    listen(){
        this.app.listen(this.port,()=>{
                console.log('Sever running on http://localhost:'+this.port);
        });
    }
}

export default Server;