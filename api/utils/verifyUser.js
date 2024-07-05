import jwt from 'jsonwebtoken';
import { errorHandler } from './customError.js';

export const verifyUser = (requiredRoles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(errorHandler(401, 'Unauthorized'));
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                return next(errorHandler(401, 'Unauthorized'));
            }
            req.user = user;

            // Check if the user's role is included in the required roles
            if (requiredRoles.length && !requiredRoles.includes(user.role)) {
                return next(errorHandler(403, 'Forbidden'));
            }

            next();
        });
    };
};
