
import { Request, Response } from 'express';


export function logErrors(err: any, req: Request, res: Response, next: any) {
    console.error(err.stack);
    next(err);
}
  
export function errorHandler(err: any, req: Request, res: Response, next: any) {
    res.status(500);
    res.render('error', { error: err });
}


export function manageError(err: any, req: Request, res: Response, next: any) {
    if (err.constructor) {
      const errorName = err.constructor.name;
  
      console.log('error: ' + errorName);
      console.log(err);
  
      const isLocal =
        req.socket.remoteAddress &&
        ['localhost', '::1', '127.0.0.1'].includes(
          req.socket.remoteAddress
        );
      const stack = isLocal ? err.stack!.split('\n') : undefined;
  
      res.status(400).send({
        error: err,
        errorName,
        stack
      });
    } else {
      next(err);
    }
  }