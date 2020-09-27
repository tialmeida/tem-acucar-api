import Building from '../models/Building';
import YupBuilding from '../../validations/YupBuilding';
import Residents from '../models/Resident';
import FileController from './FileController';

class BuildingsController {
  async create(req, res) {
    if (!(await YupBuilding.store.isValid(req.body))) {
      return res.status(400).send();
    }

    const building = await Building.create(req.body);
    const { id } = building;
    const {
      ap_number, name, nickname, password, phone,
    } = req.body.resident;
    const resident = await Residents.create({
      id_building: id, ap_number, name, nickname, password, phone, admin: true,
    });
    building.id_owner = resident.id;
    await building.save();

    if (req.file) {
      await FileController.store(req.file.filename, resident.id);
    }

    return res.json(building);
  }

  async update(req, res) {
    const building = await Building.findByPk(req.params.id);
    if (!building) {
      return res.status(400).send();
    }
    building.active = true;

    const owner = await Residents.findByPk(building.id_owner);
    if (!owner) {
      return res.status(400).send();
    }
    owner.active = true;

    await building.save();
    await owner.save();

    return res.json(building);
  }

  async delete(req, res) {
    const building = await Building.findByPk(req.params.id);
    building.active = false;
    await building.update();
    return res.json(building);
  }
}

export default new BuildingsController();
