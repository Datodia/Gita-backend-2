import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function IsAdminMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.headers['role'] ||
      !roles.includes(req.headers['role'] as string)
    )
      throw new UnauthorizedException('Perminito denied');

    next();
  };
}
