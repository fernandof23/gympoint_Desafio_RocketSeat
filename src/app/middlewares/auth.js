import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ error: 'Token not found' });
  }
  const [, token] = tokenHeader.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Token with a bad format' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
