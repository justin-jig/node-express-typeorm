import { Response, Request, Router } from 'express';
import { HomeController, 
         RecruitmentController } from './controller';

export class Routes {

  private homeController: HomeController;
  private recruitmentController: RecruitmentController;

  constructor() {

    this.homeController = new HomeController();
    this.recruitmentController = new RecruitmentController();
  }
  
  public registerRoutes(router: Router): void {

    router.get('/' ,(req: Request, res: Response) => {
      res.status(200).send('welcome');
    }); 
    this.homeController.registerRoutes(router);
    this.recruitmentController.registerRoutes(router);
  }
}
