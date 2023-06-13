import * as express  from 'express'
import { Request, Response } from 'express';

const routes = express.Router()

routes
    routes.get('/', (res: Response) => {
        res.send('Welcome to my project!');
    });
export default routes;
