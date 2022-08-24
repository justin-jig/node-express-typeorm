import { Response, Request, Router } from 'express';

interface recruitmentInterface {
   routerPath: string;
}
  
export class RecruitmentController implements recruitmentInterface {
    
    routerPath:string = '/recruitment'

    public registerRoutes(router: Router): void {
        router.get(this.routerPath + '', (req, res) => this.search(req, res));
    }

    /**
     * GET
     * @param req 
     * @param res 
     */
    public search (req: Request, res: Response) {
        res.status(200).send({ status: 'OK' });
    }

}