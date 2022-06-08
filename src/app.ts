
import express, { Application } from 'express';
import { routes } from './routes';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import http from "http";
const db = require("../models/index");
dotenv.config();

/**
 * Class of the principal application of the server
 * ```
 * const app = new App();
 * const app = new App(8000);
 * ```
 * 
 */

export class App {
    public app: Application;
    public server:any;

    /**
     * 
     * @param port the number of the port where the app is started to listen
     */
    constructor(private port?: number | string) {
        this.app = express();
        this.server = new http.Server(this.app);
        this.settings();
        this.middlewares();
        this.routes();
        
    }

    private settings() {
        this.app.set('port', this.port || process.argv[2] || process.env.API_PORT || 8000);
    }

    private middlewares() {
        this.app.use(cors({ exposedHeaders: 'Authorization' }));
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(fileUpload());
    }

    private routes() {
        routes(this.app);
    }

    /**
     * Function to start the server
     */
    public listen() {
        this.server.listen(this.app.get('port'));
        console.log(`running on port ${this.app.get('port')}`);
    }

    /**
     * Function to close the server
     */
    public close() {
        this.server.close()
    }
}