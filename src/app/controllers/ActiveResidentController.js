import Resident from '../models/Resident';
import YupActive from '../../validations/YupActive';

class ActiveResidentController {
    async update(req, res){
        if((!(await YupActive.isValid(req.body)))){
            return res.status(400).send();
        }

        const {id_resident} = req;
        const resident_admin = await Resident.findByPk(id_resident);

        if(!resident_admin){
            return res.status(400).send();
        }
        
        if(!resident_admin.admin){
            return res.status(401).send();
        }
        const {active} = req.body;
        const id = req.body.id_resident;
        const resident = await Resident.findByPk(id);

        if(!resident){
            return res.status(406).send();
        }

        resident.active = active;
        await resident.save();
        return res.send();
    }
}

export default new ActiveResidentController