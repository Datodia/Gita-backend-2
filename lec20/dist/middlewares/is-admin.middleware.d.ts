import { NextFunction, Request, Response } from 'express';
export declare function IsAdminMiddleware(roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
