import * as express  from 'express'
import { Request, Response } from 'express';

const routes = express.Router()

routes
    routes.get('/', (res: any) => {
        res.send('Welcome to my project!');
    });
export default routes;