import jwt from 'jsonwebtoken';
import { errorHandler } from "./customError.js";

export const verifyUser = async (req, res, next) => {
  console.log(req.body)
  const authHeader = req.headers.authorization;
  
  
    if (!authHeader) {
        return next(errorHandler(401, 'Unauthorized'));
    }
      const token = authHeader.split(' ')[1];
      
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
            console.log('errorToken:',err)
            return next(errorHandler(401, 'unauthorized'));
        }
        req.user = user;
        next();
    });
};
