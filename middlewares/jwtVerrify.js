import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtVerify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token is missing');
    }
    const tokenParts = token.split(' ');
    const tokenValue = tokenParts[1];
        
    jwt.verify(tokenValue, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("err", err);
            return res.status(403).send('Token is invalid');
        }
        next();
    });
}

export default jwtVerify;