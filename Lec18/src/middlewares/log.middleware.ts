import { NextFunction, Request, Response } from "express";

export default function LogMiddleware(req: Request, res: Response, next: NextFunction){
    console.log(req.headers["user-agent"])

    next()
}
