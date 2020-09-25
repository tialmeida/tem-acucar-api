import Resident from "../models/Resident";
import YupResident from '../../validations/YupResident';

class ResidentsController {
    async create(req, res){
        if(!(await YupResident.store.isValid(req.body))){
            return res.status(400).send();
        }
        const resident = await Resident.create(req.body);
        resident.password_hash = undefined;

        return res.json(resident);
    }

    async index(req, res){
        const resident = await Resident.findByPk(req.id_resident);
        resident.password_hash = undefined
        return res.json(resident);
    }
    
    async list(req, res){       
        const resident = await Resident.findByPk(req.id_resident);
        resident.password_hash = undefined;
        
        const {id_building} = resident;
        
        if(resident.admin){
            const residents = await Resident.findAll({
                attributes: { 
                    exclude: ['password_hash'] 
                },
                where: {
                    id_building,
                },
                
            });
            return res.json(residents);
        }
        else {
            const residents = await Resident.findAll({
                attributes: { 
                    exclude: ['password_hash'] 
                },
                where: {
                    id_building,
                    active: true,
                }
            });
            return res.json(residents);
        }
    }

    async update(req, res){
        const {id} = req.params;
        const resident = await Resident.findByPk(id);
        resident.password_hash = undefined;

        if(!resident){
            return res.status(406).send();
        }

        await resident.update(req.body,{
            where: {id}
        })
        
        return res.json(resident)
    }
}

export default new ResidentsController;