import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'token não enviado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      authConfig.key,
    );
    req.id_resident = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).send({ error: 'token inválido' });
  }
};
