import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as chalk from 'chalk';

const connString = process.env.MONGO_CONNECTION ||'';
const mongod = new MongoMemoryServer();

export const dbConfig: mongoose.ConnectionOptions =  {
      useMongoClient: true
  }

export async function  connectDb  (appStart: ()=>void ) {
  //as we should be using node > 7 we should have native promises
  (mongoose as any).Promise = global.Promise;

  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useMongoClient: true
};

    try {
        //try to connect using our configuration
        const db = await mongoose.connect(uri, mongooseOpts);
        //so we can see what is running as we develop
        mongoose.set('debug', true);
    
        if(appStart)//if we get this far launch the app
            appStart();

    } catch (error) {
        //using chalk to give any errors a forboding red colour        
        console.error(chalk.red('Could not connect to MongoDB!', error));
    }
};