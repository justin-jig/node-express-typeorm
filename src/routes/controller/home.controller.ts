
import { Response, Request, Router } from 'express';

interface homeInterface {
   routerPath: string;

}
  
export class HomeController implements homeInterface {
    
    routerPath:string = '/home'

    public registerRoutes(router: Router): void {
        router.get(this.routerPath + '', (req, res) => this.home(req, res));
    }

    /**
     * GET
     * @param req 
     * @param res 
     */
    public home (req: Request, res: Response) {
        res.status(200).send({ status: 'OK' });
    }

}