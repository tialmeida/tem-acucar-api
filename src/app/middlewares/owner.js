import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfig';
import Resident from '../models/Resident';
import Residents from '../models/Resident';

export default async (req, res, next) => {
  const resident = await Residents.findByPk(req.id_resident);
  if (resident.admin) {
    return next();
  }
  return res.status(401).send();
};
