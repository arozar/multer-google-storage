import * as express from 'express';
import { connectDb } from './config/config';
import * as chalk from 'chalk';
import  profiles  from './Profiles/Routes/profiles.routes';

//declare out start up logic
const appStart = () => {

    const app: express.Express = express();
    //setup our features (of which there is one)
    const profilesViews = profiles(app);
    //setup our view engine
    app.set('view engine', 'pug')
    //start the app
    app.listen('3002', () => console.log(chalk.green('Server listening on port 3002')));
}

appStart();



