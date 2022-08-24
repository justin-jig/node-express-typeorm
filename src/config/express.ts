

/** modules import  */
import http from 'http';
import express, { Application, Request, Response, Router } from 'express';
import cors from 'cors';
import helmet from "helmet";

/** import router */
import { Routes } from '../routes/routes';

/** import method */
import { logErrors, errorHandler, manageError } from '../method/error/error';


function createExpressMiddleware(port: string | number, router: Router): Application {
    const app = express();
    app.set('port', port);
    app.use(helmet());
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.BABYFOOTAPI_CORS_ORIGINS) {
        console.error('in production mode, you need to specify BABYFOOTAPI_CORS_ORIGINS for CORS!');
        process.exit(1);
      }
      app.use(cors({ origin: process.env.BABYFOOTAPI_CORS_ORIGINS!.split(' ') }));
    } else {
      app.use(cors());
    }
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: false
      })
    );
    app.use('/', router);
    app.use(logErrors);
    app.use(manageError);
    app.use(errorHandler);
    return app;
}

function startServer(app: Application): void {
    const server = http.createServer(app);
    server.listen(app.get('port'), () => {
      console.log('Babyfoot API Express server listening on port ' + app.get('port'));
    });
}

export function expressRun(port: string | number) {

    const routes = new Routes();
    const router = express.Router();
    routes.registerRoutes(router);
    const app = createExpressMiddleware(port, router);
    startServer(app);

}
  