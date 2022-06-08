import { Sequelize } from 'sequelize-typescript';
import File from "./file";
import User from "./user";

const env = process.env.NODE_ENV || "development";
let database="",username="",password="",host="";
import config from "../config/config";

if(env == "development"){
  database = config.development.database as string;
  username = config.development.username as string;
  password = config.development.password as string;
  host = config.development.host as string;
}else if(env == "production"){
  database = config.production.database as string;
  username = config.production.username as string;
  password = config.production.password as string;
  host = config.development.host as string;
}

class dbConnection {
  db:Sequelize;

  constructor(){
    this.connectDb();
  }

  close():void{
    this.db.close();
    console.log("closed...");
  }

  connectDb(): any {
    this.db = new Sequelize({
      dialect: "mysql",
      database: database,
      username: username,
      password: password,
      host:host,
      //validateOnly: true,
      models: [
        User,
        File
      ]
    });
    
    this.db.authenticate().then(function(){
      console.log("database connected ...");
    }).catch(function(error){
      console.log("Database catch block : "+ error)
    });
  }
}

const db = new dbConnection();
export default db;