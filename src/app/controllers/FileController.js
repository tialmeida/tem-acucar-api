import Residents from '../models/Resident';
import fs from 'fs';
import {resolve} from 'path';

class FileController{
    async store(filename, id){
        const resident = await Residents.findByPk(id);
        if(!resident){
            return;
        }

        await Residents.update({photo: filename}, {
            where: {id}
        });
        return;
    }

    async update(req, res){
        const resident = await Residents.findByPk(req.id_resident);
        const filepath = resolve(__dirname, '..', '..', '..', 'uploads/avatars') + "\\" + resident.photo;
        console.log(filepath);
        fs.unlink(filepath, (error) => {})
        resident.photo = req.file.filename;
        await resident.save();
        return res.send();
    }

    async delete(req, res){
        const resident = await Residents.findByPk(req.id_resident);
        const filepath = resolve(__dirname, '..', '..', '..', 'uploads/avatars') + "\\" + resident.photo;
        fs.unlink(filepath, (error) => {})
        resident.photo = null;
        await resident.save();
        return res.send();
    }
}

export default new FileController();