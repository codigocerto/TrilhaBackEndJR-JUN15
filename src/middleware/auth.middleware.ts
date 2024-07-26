import { jwtConstants } from '@/auth/constants';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = extractTokenFromHeader(req);

  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const payload = jwt.verify(token, jwtConstants.secret);

    if (!payload) return res.status(403).send('Invalid token.');

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).send('Unauthorized. Invalid token.');
  }
}

function extractTokenFromHeader(request: Request): string | undefined {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) return undefined;

  const [type, token] = authorizationHeader.split(' ');
  if (type !== 'Bearer' || !token) return undefined;

  return token;
}

export { AuthenticatedRequest, authMiddleware };
