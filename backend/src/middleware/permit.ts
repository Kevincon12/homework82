import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../types";

const permit = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const request = req as RequestWithUser;

        if (!request.user) {
            return res.status(401).send({ error: "Unauthenticated" });
        }

        if (!roles.includes(request.user.role)) {
            return res.status(403).send({ error: "Unauthorized" });
        }

        next();
    };
};

export default permit;