import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import UserRouter from './routers/UserRouter';

class Server{

    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        // set up mongoose
        const MONGOOSE_URI = "mongodb://testuser:test@ds115493.mlab.com:15493/tradefestapi";
        mongoose.connect(MONGOOSE_URI);
        
        // config
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    public routes(): void{
        let router: express.Router;
        router = express.Router();

        this.app.use("/api/users", UserRouter);
    }
}

export default new Server().app;