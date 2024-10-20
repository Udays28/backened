import {Request, Response, NextFunction} from "express"

export interface NewUserRequestBody{
    _id: string;
    name: string;
    email: string;
    password: string;
    referalCode: string;
    phone: number;
    gender: string;
}

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string,  any>>>;