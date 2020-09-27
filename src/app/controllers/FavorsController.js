import Favor from '../models/Favor';
import Resident from '../models/Resident';
import Notification from '../schemas/Notification';
import YupFavor from '../../validations/YupFavor';
import Itens from '../models/Item';

class FavorsController {
  async create(req, res) {
    if (!(await YupFavor.store.isValid(req.body))) {
      return res.status(400).send();
    }

    const user = await Resident.findByPk(req.id_resident);

    const favor = await Favor.create({ ...req.body, id_creator: req.id_resident });

    const residents = await Resident.findAll({
      where: { id_building: req.body.id_building },
      active: true,
    });

    residents.forEach(async (resident) => {
      await Notification.create({
        title: `"Ajude seu vizinho ${user.name.split(' ')[0]}`,
        content: req.body.title,
        id_user: resident.id,
      });
    });

    return res.json(favor);
  }

  async index(req, res) {
    const favor = await Favor.findByPk(req.params.id, {
      include: [{
        model: Itens,
        as: 'items',
        attributes: ['id', 'item'],
      }],
    });
    if (!favor) {
      return res.status(404).send();
    }
    return res.json(favor);
  }

  async list(req, res) {
    const resident = await Resident.findByPk(req.id_resident);

    // eslint-disable-next-line camelcase
    const { id_building } = resident;

    if (resident.admin) {
      const favor = await Favor.findAll({
        where: {
          id_building,

        },
      }, {
        include: [{
          model: Itens,
          as: 'items',
          attributes: ['id', 'item'],
        }],
      });
      return res.json(favor);
    }

    const favor = await Favor.findAll({
      where: {
        id_building,
        state: 'em aberto',
      },

    }, {
      include: [{
        model: Itens,
        as: 'items',
        attributes: ['id', 'item'],
      }],
    });
    return res.json(favor);
  }

  async update(req, res) {
    if (!(await YupFavor.update.isValid(req.body))) {
      return res.status(400).send();
    }

    const { id } = req.params;
    const favor = await Favor.findByPk(id);

    if (!favor) {
      return res.status(406).send();
    }

    await favor.update(req.body, {
      where: { id },
    });

    return res.json(favor);
  }

  async delete(req, res) {
    if (!(await YupFavor.delete.isValid(req.params))) {
      return res.status(400).send();
    }

    const { id } = req.params;
    const favors = await Favor.findByPk(id);

    if (!favors) {
      return res.status(406).send();
    }

    await favors.update({ state: 'finalizado' }, {
      where: { id },
    });

    return res.json(favors);
  }
}

export default new FavorsController();
