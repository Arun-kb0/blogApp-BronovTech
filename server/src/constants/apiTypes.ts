import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  email?: string;
  userId?: string;
  role?: 'admin' | 'user';
}

export interface JwtWithUserIdAndEmail extends JwtPayload {
  email: string;
  userId: string;
}