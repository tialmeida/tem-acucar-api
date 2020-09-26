import jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import { promisify } from 'util';
import Resident from '../models/Resident';
import Residents from '../models/Resident';

export default async(req, res, next) => {
    const resident = await Residents.findByPk(req.id_resident);
    if(resident.admin){
        return next();
    }else{
        return res.status(401).send();
    }
}