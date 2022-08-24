import { expressRun } from './src/config/express';

import { createConnection, Connection, DataSource } from "typeorm";


declare type process = any;

//connect to entity
createConnection().then(async (connection: Connection) =>{
    console.log('Entity connected');
    console.log("Entity connected : ", connection.isConnected);
    expressRun(process.env.PORT || 3000);
}).catch((err: Error) => console.log("Entity connection error : ", err));